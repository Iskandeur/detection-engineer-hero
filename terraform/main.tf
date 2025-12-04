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

resource "openstack_compute_instance_v2" "app_instance" {
  name            = "detection-engineer-hero"
  image_name      = "Ubuntu 22.04"
  flavor_name     = "b3-8" # Valid flavor from list
  key_pair        = openstack_compute_keypair_v2.keypair.name
  security_groups = ["default"]

  network {
    name = "Ext-Net" # OVH public network name
  }

  user_data = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y docker.io docker-compose git

    # Create application directory
    mkdir -p /app
    cd /app

    # Note: In a real deployment, you would clone the repo here.
    # git clone https://github.com/your-user/detection-engineer-hero.git .
    
    # For now, just ensure Docker is ready
    systemctl enable docker
    systemctl start docker
    
    echo "Instance ready for Detection Engineer Hero deployment"
  EOF
}

output "instance_ip" {
  value = openstack_compute_instance_v2.app_instance.access_ip_v4
}
