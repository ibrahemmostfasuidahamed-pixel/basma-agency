export const iosSpring = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
}

export const iosBounce = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 25,
    mass: 0.6,
}

export const iosEase = {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
}

// Card entrance animation
export const cardEnter = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { ...iosSpring, delay: i * 0.08 },
    }),
}

// Slide up from bottom (iOS sheet style)
export const slideUp = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: iosSpring,
    },
    exit: {
        y: '100%',
        opacity: 0,
        transition: { duration: 0.25 },
    },
}

// Pop in (iOS notification style)
export const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: iosBounce,
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.15 },
    },
}
