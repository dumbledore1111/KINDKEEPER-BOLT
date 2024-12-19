import { startRecording, stopRecording, transcribeAudio } from '../speech';

class VoiceService {
  private static instance: VoiceService;
  private isRecording = false;

  private constructor() {}

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) return;
    this.isRecording = true;
    await startRecording();
  }

  async stopRecording(): Promise<string> {
    if (!this.isRecording) return '';
    this.isRecording = false;
    const audioBlob = await stopRecording();
    const transcription = await transcribeAudio(audioBlob);
    return transcription;
  }
}

export const voiceService = VoiceService.getInstance();