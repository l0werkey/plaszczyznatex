import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './styles.css';

const generateRandomPlaneStyle = (existingPlanes = []) => {
    const size = Math.random() * 50 + 50;
    const startX = Math.random() * 100;
    const startRotationX = 90 + Math.random() * 90 - 45;
    const startRotationY = Math.random() * 90 - 45;
    const startRotationZ = Math.random() * 360;

    const adjustedStartX = checkCollision(startX, size, existingPlanes);

    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `calc(${adjustedStartX}% - ${size}px)`,
        transform: `rotateX(${startRotationX}deg) rotateY(${startRotationY}deg) rotateZ(${startRotationZ}deg)`,
        zIndex: 1,
    };
};

const checkCollision = (startX, size, existingPlanes) => {
    for (let i = 0; i < existingPlanes.length; i++) {
        const plane = existingPlanes[i];
        const distance = Math.abs(startX - plane.left);
        if (distance < (size + plane.width)) {
            startX = Math.random() * 100;
            return checkCollision(startX, size, existingPlanes);
        }
    }
    return startX;
};

const Background = () => {
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlanes((prevPlanes) => [
                ...prevPlanes,
                generateRandomPlaneStyle(prevPlanes),
            ]);
            setTimeout(() => {
                setPlanes((prevPlanes) => prevPlanes.slice(1));
            }, 10000);
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.planesBackground}>
            {planes.map((planeStyle, index) => (
                <div
                    key={index}
                    className={styles.plane}
                    style={planeStyle}
                />
            ))}
        </div>
    );
};

export default Background;
