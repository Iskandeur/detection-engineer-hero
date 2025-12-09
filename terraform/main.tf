terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.53.0"
    }
  }
}

provider "openstack" {
  auth_url    = "https://auth.cloud.ovh.net/v3/"
  # region      = "GRA11" # Removed to use OS_REGION_NAME from env
  # Credentials must be configured via environment variables:
  # OS_USERNAME, OS_PASSWORD, OS_TENANT_ID, etc.
  # Or via a clouds.yaml file
}

resource "openstack_compute_keypair_v2" "keypair" {
  name = "detection-hero-key"
  # Replace with the path to your public key
  public_key = file("~/.ssh/id_rsa.pub") 
}

# Retrieve the default security group
data "openstack_networking_secgroup_v2" "default" {
  name = "default"
}

# Add rules to the default security group (if possible) or just rely on it
# Note: Adding rules to 'default' might be restricted or messy. 
# Better approach: Try to add rules to the 'default' group using its ID.

# Rules removed due to Quota Exceeded. 
# Please ensure ports 22 (SSH) and 3000 (HTTP) are open in the 'default' security group via OVH Manager.

resource "openstack_networking_network_v2" "private_network" {
  name           = "private-net"
  admin_state_up = "true"
}

resource "openstack_networking_subnet_v2" "private_subnet" {
  name            = "private-subnet"
  network_id      = openstack_networking_network_v2.private_network.id
  cidr            = "192.168.1.0/24"
  ip_version      = 4
  dns_nameservers = ["1.1.1.1", "8.8.8.8"]
}

resource "openstack_networking_router_v2" "router" {
  name                = "router-gateway"
  admin_state_up      = "true"
  external_network_id = "6d041167-5863-4cad-a165-d352bb6720ab" # Ext-Net ID from error log
}

resource "openstack_networking_router_interface_v2" "router_interface" {
  router_id = openstack_networking_router_v2.router.id
  subnet_id = openstack_networking_subnet_v2.private_subnet.id
}

resource "openstack_compute_instance_v2" "app_instance" {
  name            = "detection-engineer-hero"
  image_name      = "Ubuntu 22.04"
  flavor_name     = "c3-4"
  key_pair        = openstack_compute_keypair_v2.keypair.name
  security_groups = ["default"]

  network {
    uuid = openstack_networking_network_v2.private_network.id
  }

  depends_on = [openstack_networking_router_interface_v2.router_interface]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y docker.io docker-compose git

    mkdir -p /app
    cd /app

    systemctl enable docker
    systemctl start docker
    
    echo "Instance prête pour le déploiement de Detection Engineer Hero"
  EOF
}

resource "openstack_networking_floatingip_v2" "fip" {
  pool = "Ext-Net"
}

resource "openstack_compute_floatingip_associate_v2" "fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.fip.address
  instance_id = openstack_compute_instance_v2.app_instance.id
}

output "instance_ip" {
  value = openstack_compute_instance_v2.app_instance.access_ip_v4
}

output "floating_ip" {
  value = openstack_networking_floatingip_v2.fip.address
}
