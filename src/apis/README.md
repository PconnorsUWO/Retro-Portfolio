# Keyboard Sound API

A comprehensive keyboard sound system for adding audio feedback to key presses. This API provides customizable sound effects for both key down and key up events with fallback sound generation.

## Features

- ✅ **Key Down/Up Events**: Separate sounds for key press and release
- ✅ **Custom Sound Mapping**: Configure different sounds for specific keys
- ✅ **Volume Control**: Global and per-key volume settings
- ✅ **Fallback Sound Generation**: Synthetic sounds when audio files aren't available
- ✅ **Predefined Configurations**: Retro, mechanical, typewriter, gaming themes
- ✅ **React Integration**: Easy-to-use React hooks
- ✅ **TypeScript Support**: Full type safety and IntelliSense

## Quick Start

### Basic Usage

```typescript
import { keyboardSoundAPI } from './apis/keyboardSound';

// Initialize the API
await keyboardSoundAPI.initialize();

// Start listening for keyboard events
keyboardSoundAPI.startListening();

// Stop listening
keyboardSoundAPI.stopListening();
```

### React Hook Usage

```tsx
import { useKeyboardSound } from './hooks/useKeyboardSound';
import { RETRO_KEYBOARD_CONFIG } from './apis/keyboardSoundPresets';

const MyComponent: React.FC = () => {
  const keyboardSound = useKeyboardSound(RETRO_KEYBOARD_CONFIG);

  return (
    <div>
      <button onClick={() => keyboardSound.setGlobalEnabled(false)}>
        Disable Sounds
      </button>
    </div>
  );
};
```

### Enhanced API with Fallback Sounds

```typescript
import { enhancedKeyboardSoundAPI } from './apis/enhancedKeyboardSound';

// Initialize with fallback sound generation
await enhancedKeyboardSoundAPI.initialize();
enhancedKeyboardSoundAPI.startListening();

// Play custom generated sounds
enhancedKeyboardSoundAPI.playCustomSound('typewriter', 'down', 0.5);
```

## Configuration

### Predefined Configurations

```typescript
import { getKeyboardConfig } from './apis/keyboardSoundPresets';

// Available configurations
const configs = [
  'retro',        // Retro computer sounds
  'mechanical',   // Mechanical keyboard sounds
  'typewriter',   // Classic typewriter sounds
  'gaming',       // Gaming-optimized sounds
  'silent'        // No sounds
];

const config = getKeyboardConfig('retro');
```

### Custom Configuration

```typescript
import { KeyboardSoundOptions } from './apis/keyboardSound';

const customConfig: KeyboardSoundOptions = {
  defaultVolume: 0.5,
  globalEnabled: true,
  defaultKeyDownSound: '/sounds/my-key-down.wav',
  defaultKeyUpSound: '/sounds/my-key-up.wav',
  keyMappings: {
    'Space': {
      keyDownSound: '/sounds/spacebar-down.wav',
      keyUpSound: '/sounds/spacebar-up.wav',
      volume: 0.7
    },
    'Enter': {
      keyDownSound: '/sounds/enter-down.wav',
      keyUpSound: '/sounds/enter-up.wav',
      volume: 0.8,
      enabled: true
    },
    'Backspace': {
      enabled: false  // Disable sound for backspace
    }
  }
};
```

## API Reference

### KeyboardSoundAPI

#### Methods

- `initialize()`: Initialize audio context and load default sounds
- `startListening()`: Start listening for keyboard events
- `stopListening()`: Stop listening for keyboard events
- `loadSound(key: string, url: string)`: Load a custom sound file
- `updateKeyMapping(key: string, config: KeySoundConfig)`: Update key configuration
- `setGlobalEnabled(enabled: boolean)`: Enable/disable all sounds
- `setGlobalVolume(volume: number)`: Set global volume (0-1)
- `destroy()`: Clean up resources

#### Configuration Options

```typescript
interface KeyboardSoundOptions {
  defaultVolume?: number;           // Default volume (0-1)
  globalEnabled?: boolean;          // Global enable/disable
  keyMappings?: Record<string, KeySoundConfig>;
  defaultKeyDownSound?: string;     // Default key down sound URL
  defaultKeyUpSound?: string;       // Default key up sound URL
}

interface KeySoundConfig {
  keyDownSound?: string;   // Custom key down sound URL
  keyUpSound?: string;     // Custom key up sound URL
  volume?: number;         // Custom volume (0-1)
  enabled?: boolean;       // Enable/disable for this key
}
```

### EnhancedKeyboardSoundAPI

Extends `KeyboardSoundAPI` with additional features:

- **Fallback Sound Generation**: Synthetic sounds when files aren't available
- **Custom Sound Generation**: Generate sounds on-demand
- **Better Error Handling**: Graceful fallbacks for missing audio files

#### Additional Methods

- `playCustomSound(type, variant, volume)`: Play generated sound
  - `type`: 'beep' | 'click' | 'mechanical' | 'typewriter' | 'spacebar'
  - `variant`: 'down' | 'up'
  - `volume`: 0-1

### AudioGenerator

Utility class for generating synthetic keyboard sounds:

```typescript
import { AudioGenerator } from './apis/audioGenerator';

const generator = new AudioGenerator();

// Generate different types of sounds
const beep = generator.generateBeep(440, 0.1, 0.3);
const click = generator.generateClick(0.05, 0.2);
const mechanical = generator.generateMechanicalKey('down');
const typewriter = generator.generateTypewriter('down');
const spacebar = generator.generateSpacebar('down');

// Play generated sound
generator.playBuffer(beep, 0.5);
```

## Sound File Requirements

- **Format**: WAV, MP3, or OGG
- **Duration**: 0.05 - 0.2 seconds recommended
- **Sample Rate**: 44.1kHz recommended
- **Channels**: Mono or stereo

### Recommended Sound Structure

```
public/sounds/
├── retro-key-down.wav
├── retro-key-up.wav
├── spacebar-down.wav
├── spacebar-up.wav
├── enter-down.wav
├── enter-up.wav
├── backspace-down.wav
├── backspace-up.wav
└── ...
```

## Key Codes

Common key codes for mapping:

```typescript
// Letter keys
'KeyA', 'KeyB', 'KeyC', ..., 'KeyZ'

// Number keys
'Digit0', 'Digit1', ..., 'Digit9'

// Special keys
'Space', 'Enter', 'Backspace', 'Tab', 'Escape'
'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight'
'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'

// Function keys
'F1', 'F2', ..., 'F12'

// Arrow keys
'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
```

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile**: Limited support (user interaction required)

## Performance Considerations

- Sounds are cached after first load
- Audio context is shared across instances
- Memory usage is optimized for typical keyboard usage
- Fallback sounds are pre-generated to avoid runtime overhead

## Examples

See the `KeyboardSoundDemo` component for a complete working example with all features demonstrated.

## Troubleshooting

### No Sound Playing

1. Check browser audio permissions
2. Verify audio files exist and are accessible
3. Ensure audio context is initialized after user interaction
4. Check volume levels and enabled state

### Performance Issues

1. Reduce `defaultVolume` to lower values
2. Use shorter sound files
3. Consider using fallback sounds instead of files
4. Limit the number of simultaneous sounds

### Memory Usage

1. Call `destroy()` when component unmounts
2. Use the enhanced API for better resource management
3. Avoid loading unnecessary custom sounds
