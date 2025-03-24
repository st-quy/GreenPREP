import { useEffect, useRef } from "react";

const AudioVisualizer = ({ isRecording }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationIdRef = useRef(null);
  const dataArrayRef = useRef(null);
  const bufferLengthRef = useRef(null);

  useEffect(() => {
    if (!isRecording) return;
  
    const audioContext = new AudioContext(); // ✅ Không cần kiểm tra webkitAudioContext
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    bufferLengthRef.current = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLengthRef.current);
  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        visualize();
      })
      .catch((err) => console.error("Microphone access denied:", err));
  
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [isRecording]);
  

  const visualize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      let sliceWidth = (canvas.width * 1.0) / bufferLengthRef.current;
      let x = 0;

      for (let i = 0; i < bufferLengthRef.current; i++) {
        let v = dataArrayRef.current[i] / 128.0;
        let y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#4F46E5"; // Tailwind blue-700
      ctx.stroke();

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <div className="relative w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center">
      <canvas ref={canvasRef} width={400} height={100} className="w-full h-full" />
      {!isRecording && <p className="absolute text-white">🎤 Micro Off</p>}
    </div>
  );
};

//Import useState, use useState for the isLoading variable, and pass it to the AudioVisualizer component.
export default AudioVisualizer;
