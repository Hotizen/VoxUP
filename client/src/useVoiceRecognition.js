import { useState, useEffect } from 'react';

const useVoiceRecognition = (onCommandRecognized) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setError('Browser does not support Web Speech API');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false; // Stop after a single command
        recognition.interimResults = false;

        const startListening = () => {
            recognition.start();
            setIsListening(true);
        };

        const stopListening = () => {
            recognition.stop();
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript;
            setTranscript(command);
            onCommandRecognized(command); // Pass the command to the parent
        };

        recognition.onerror = (event) => {
            setError(event.error);
        };

        // Start listening on mount and clean up
        startListening();
        return () => stopListening();
    }, [onCommandRecognized]);

    return { isListening, transcript, error };
};

export default useVoiceRecognition;