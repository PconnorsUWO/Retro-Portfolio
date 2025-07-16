/**
 * Audio generation utilities for keyboard sounds
 * Creates synthetic sound effects when audio files are not available
 */

export class AudioGenerator {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  /**
   * Generate a simple beep sound
   */
  generateBeep(frequency: number = 440, duration: number = 0.1, volume: number = 0.3): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      // Generate a simple sine wave with fade out
      const fadeOut = 1 - (i / numSamples);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * volume * fadeOut;
    }

    return buffer;
  }

  /**
   * Generate a click sound
   */
  generateClick(duration: number = 0.05, volume: number = 0.2): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      // Generate white noise with quick fade
      const fade = Math.exp(-i / (numSamples * 0.1));
      data[i] = (Math.random() * 2 - 1) * volume * fade;
    }

    return buffer;
  }

  /**
   * Generate a mechanical key sound
   */
  generateMechanicalKey(type: 'down' | 'up' = 'down'): AudioBuffer {
    const duration = type === 'down' ? 0.08 : 0.05;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    const baseFreq = type === 'down' ? 800 : 1200;
    const volume = type === 'down' ? 0.3 : 0.2;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / numSamples;
      
      // Create a complex waveform with harmonics
      let sample = 0;
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.5;
      sample += Math.sin(2 * Math.PI * baseFreq * 2 * t) * 0.3;
      sample += Math.sin(2 * Math.PI * baseFreq * 3 * t) * 0.2;
      
      // Add some noise for mechanical feel
      sample += (Math.random() * 2 - 1) * 0.1;
      
      // Apply envelope
      const envelope = type === 'down' 
        ? Math.exp(-progress * 8) 
        : Math.exp(-progress * 15);
      
      data[i] = sample * volume * envelope;
    }

    return buffer;
  }

  /**
   * Generate a typewriter sound
   */
  generateTypewriter(type: 'down' | 'up' = 'down'): AudioBuffer {
    const duration = type === 'down' ? 0.12 : 0.08;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    const volume = type === 'down' ? 0.4 : 0.2;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / numSamples;
      
      // Create a sharp attack with multiple frequency components
      let sample = 0;
      
      if (type === 'down') {
        // Sharp attack for key down
        sample += Math.sin(2 * Math.PI * 1500 * t) * 0.4;
        sample += Math.sin(2 * Math.PI * 2200 * t) * 0.3;
        sample += Math.sin(2 * Math.PI * 3000 * t) * 0.2;
      } else {
        // Softer for key up
        sample += Math.sin(2 * Math.PI * 1000 * t) * 0.3;
        sample += Math.sin(2 * Math.PI * 1800 * t) * 0.2;
      }
      
      // Add mechanical noise
      sample += (Math.random() * 2 - 1) * 0.15;
      
      // Sharp envelope for typewriter feel
      const envelope = Math.exp(-progress * 12);
      
      data[i] = sample * volume * envelope;
    }

    return buffer;
  }

  /**
   * Generate a spacebar sound
   */
  generateSpacebar(type: 'down' | 'up' = 'down'): AudioBuffer {
    const duration = type === 'down' ? 0.15 : 0.1;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    const volume = type === 'down' ? 0.35 : 0.25;
    const baseFreq = type === 'down' ? 300 : 500;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / numSamples;
      
      // Lower frequency for spacebar
      let sample = 0;
      sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.6;
      sample += Math.sin(2 * Math.PI * baseFreq * 1.5 * t) * 0.3;
      sample += Math.sin(2 * Math.PI * baseFreq * 2 * t) * 0.2;
      
      // Add some thud
      sample += (Math.random() * 2 - 1) * 0.2;
      
      // Longer decay for spacebar
      const envelope = Math.exp(-progress * 6);
      
      data[i] = sample * volume * envelope;
    }

    return buffer;
  }

  /**
   * Play a generated sound
   */
  playBuffer(buffer: AudioBuffer, volume: number = 1): void {
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = Math.max(0, Math.min(1, volume));
    
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start();
  }
}

/**
 * Default sound generator instance
 */
export const audioGenerator = new AudioGenerator();

/**
 * Generate default sound set for keyboard
 */
export const generateDefaultSounds = () => {
  const generator = new AudioGenerator();
  
  return {
    keyDown: generator.generateMechanicalKey('down'),
    keyUp: generator.generateMechanicalKey('up'),
    spaceDown: generator.generateSpacebar('down'),
    spaceUp: generator.generateSpacebar('up'),
    enterDown: generator.generateTypewriter('down'),
    enterUp: generator.generateTypewriter('up'),
    click: generator.generateClick(),
  };
};
