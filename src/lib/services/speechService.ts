class SpeechService {
  private static instance: SpeechService;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    this.initVoices();
  }

  static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  private initVoices() {
    const loadVoices = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.isInitialized = true;
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    }

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  private getPreferredVoice(): SpeechSynthesisVoice | null {
    // Try to find an Indian English voice
    let voice = this.voices.find(v => v.lang === 'en-IN');
    
    // Fall back to any English voice
    if (!voice) {
      voice = this.voices.find(v => v.lang.startsWith('en-'));
    }

    return voice || null;
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        // Cancel any ongoing speech
        this.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure speech parameters
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.lang = 'en-IN';

        // Set preferred voice if available
        const voice = this.getPreferredVoice();
        if (voice) {
          utterance.voice = voice;
        }

        // Handle events
        utterance.onend = () => {
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          this.currentUtterance = null;
          resolve();
        };

        // Start speaking
        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);

      } catch (error) {
        console.error('Speech synthesis error:', error);
        resolve();
      }
    });
  }

  cancel() {
    window.speechSynthesis.cancel();
    if (this.currentUtterance) {
      this.currentUtterance = null;
    }
  }
}

export const speechService = SpeechService.getInstance();