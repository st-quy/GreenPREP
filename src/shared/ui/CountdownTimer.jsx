import { useState, useEffect } from "react";

const CountdownTimer = ({ duration, onTimeUp }) => {
    const storedTime = localStorage.getItem("timeLeft");
    const initialTime = storedTime ? Math.max(0, parseInt(storedTime, 10)) : duration;
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            localStorage.removeItem("timeLeft");
            onTimeUp && onTimeUp();
            return;
        }

        localStorage.setItem("timeLeft", timeLeft);

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    localStorage.removeItem("timeLeft");
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className="flex justify-center items-center bg-white w-20 h-10 shadow-md font-medium text-md md:text-lg" style={{ color: "#3758F9" }}>
            {formattedTime}
        </div>
    );
};

export default CountdownTimer;
