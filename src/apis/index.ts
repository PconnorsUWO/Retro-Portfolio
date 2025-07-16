/**
 * Keyboard Sound API - Main Export
 * 
 * This module provides a comprehensive keyboard sound system with:
 * - Basic keyboard sound API
 * - Enhanced keyboard sound API with fallback sound generation
 * - Audio generation utilities
 * - Predefined sound configurations
 * - React hooks for easy integration
 */

// Core APIs
export * from './keyboardSound';
export * from './enhancedKeyboardSound';
export * from './audioGenerator';
export * from './keyboardSoundPresets';

// Default exports for convenience
export { keyboardSoundAPI } from './keyboardSound';
export { enhancedKeyboardSoundAPI } from './enhancedKeyboardSound';
export { audioGenerator } from './audioGenerator';

// Quick start functions
export { initializeKeyboardSound } from './keyboardSound';
export { initializeEnhancedKeyboardSound } from './enhancedKeyboardSound';

// Configuration helpers
export { getKeyboardConfig, AVAILABLE_CONFIGS } from './keyboardSoundPresets';
