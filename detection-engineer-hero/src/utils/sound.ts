export const playWhipSound = () => {
    if (typeof window !== 'undefined') {
        const audio = new Audio("/sounds/whip.mp3");
        audio.play().catch((err) => console.error("Error playing sound:", err));
    }
};
