import React, { useState, useEffect } from "react";
import '../styles/App.css';

const App = () => {
    // 1. Initialize state using hooks
    const [renderBall, setRenderBall] = useState(false);
    const [posi, setPosi] = useState(0);
    const [ballPosition, setBallPosition] = useState({ left: "0px" });

    // 2. Button Handler
    const buttonClickHandler = () => {
        setRenderBall(true);
    };

    // 3. Handle Key Press
    // We wrap this logic in useEffect to attach the listener to the document
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check for Right Arrow (39) AND ensure the ball is rendered
            if (event.keyCode === 39 && renderBall) {
                const newPos = posi + 5;
                setPosi(newPos);
                setBallPosition({ left: newPos + "px" });
            }
        };

        // Attach event listener
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function (similar to componentWillUnmount)
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [renderBall, posi]); // Re-run effect if these change so logic isn't stale

    // 4. Render Logic
    const renderBallOrButton = () => {
        if (renderBall) {
            return <div className="ball" style={ballPosition}></div>;
        } else {
            return <button onClick={buttonClickHandler}>Start</button>;
        }
    };

    return (
        <div className="playground">
            {renderBallOrButton()}
        </div>
    );
};

export default App;