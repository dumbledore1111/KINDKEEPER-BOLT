import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    
    mediaRecorder.start();
  } catch (error) {
    console.error('Error starting recording:', error);
    throw error;
  }
}

export async function stopRecording(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!mediaRecorder) {
      reject(new Error('No recording in progress'));
      return;
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];
      resolve(audioBlob);
    };

    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    mediaRecorder = null;
  });
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY);
    console.log('Audio Blob size:', audioBlob.size);
    console.log('Audio Blob type:', audioBlob.type);
    
    const audioFile = new File([audioBlob], 'audio.webm', {
      type: 'audio/webm',
    });

    console.log('Sending request to OpenAI...');
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });
    console.log('Received response from OpenAI:', response);

    return response.text;
  } catch (error) {
    console.error('Detailed transcription error:', error);
    throw error;
  }
}

export async function synthesizeSpeech(text: string): Promise<void> {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.volume = 0.8;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}