import { useEffect, useRef } from "react";
const AudioVisualizer = ({ isRecording }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationIdRef = useRef(null);
  const dataArrayRef = useRef(null);
  const bufferLengthRef = useRef(null);
  useEffect(() => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
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
      if (!analyserRef.current || !isRecording) return;
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      let sliceWidth = (canvas.width * 1.0) / bufferLengthRef.current;
      let x = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#3758F9";
      for (let i = 0; i < bufferLengthRef.current; i++) {
        let v = dataArrayRef.current[i] / 128.0;
        let y = (v * canvas.height) / 1.5;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();
      animationIdRef.current = requestAnimationFrame(draw);
    };
    draw();
  };
  return (
    <div className="relative w-[60vw] h-40 bg-white rounded-lg flex items-center justify-center outline outline-1 outline-blue-500">
      <canvas ref={canvasRef} className="w-[95%] h-[90%] pb-8" />
    </div>
  );
};
//Import useState, use useState for the isRecording variable, and pass it to the AudioVisualizer component.
export default AudioVisualizer;
