# Window Resizing Architecture

## Overview
This document describes the architecture and implementation of the dynamic window resizing system for the Retro Portfolio project. The system allows users to resize windows by dragging edges and corners while maintaining minimum size constraints and proper scrolling behavior.

## Architecture Components

### 1. Core Hook: `useWindowResize`
**Location:** `src/hooks/useWindowResize.ts`

This custom React hook manages all resize logic and state:

```typescript
interface UseWindowResizeOptions {
  minWidth?: number;      // Minimum window width (default: 200px)
  minHeight?: number;     // Minimum window height (default: 150px)
  maxWidth?: number;      // Maximum window width (default: screen width - 100px)
  maxHeight?: number;     // Maximum window height (default: screen height - 100px)
  initialWidth?: number;  // Initial window width
  initialHeight?: number; // Initial window height
}
```

**Key Features:**
- Tracks window dimensions with React state
- Handles mouse events for resize operations
- Enforces size constraints (min/max dimensions)
- Provides resize state for UI feedback
- Calculates new dimensions based on drag direction

**State Management:**
- `size`: Current window dimensions
- `isResizing`: Boolean flag for resize operation state
- `resizeRef`: Reference to current resize operation data

### 2. Window Component Integration
**Location:** `src/features/window/Window.tsx`

Enhanced the main Window component with:

```typescript
interface WindowProps {
  // ... existing props
  resizable?: boolean;     // Enable/disable resizing (default: true)
  minWidth?: number;       // Minimum width constraint
  minHeight?: number;      // Minimum height constraint
  maxWidth?: number;       // Maximum width constraint
  maxHeight?: number;      // Maximum height constraint
}
```

**Key Integrations:**
- Uses `useWindowResize` hook for dimension management
- Renders 8 resize handles (4 corners + 4 edges)
- Disables dragging during resize operations
- Applies size constraints through CSS

### 3. Resize Handles System
**Location:** CSS styles in `src/index.css`

The resize system uses 8 invisible handles positioned around the window:

**Corner Handles:**
- `resize-handle-nw` (northwest): Top-left corner
- `resize-handle-ne` (northeast): Top-right corner
- `resize-handle-sw` (southwest): Bottom-left corner
- `resize-handle-se` (southeast): Bottom-right corner

**Edge Handles:**
- `resize-handle-n` (north): Top edge
- `resize-handle-s` (south): Bottom edge
- `resize-handle-w` (west): Left edge
- `resize-handle-e` (east): Right edge

**Handle Properties:**
- 10px x 10px for corner handles
- 3px thick for edge handles
- Transparent background with hover effects
- Appropriate cursor styles (resize arrows)
- z-index: 10 to ensure clickability

### 4. Scrolling System
**Location:** `src/features/window/WindowContent.tsx`

Enhanced content component with:

```typescript
interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;    // Enable/disable scrolling (default: true)
}
```

**Custom Scrollbar Styling:**
- Retro-themed scrollbars matching the overall design
- Thin scrollbar width (8px)
- Custom colors using CSS variables
- Hover effects for better user experience

## Technical Implementation Details

### Resize Logic Flow

1. **Initialization:**
   - Hook receives initial dimensions and constraints
   - Sets up state for current window size
   - Prepares resize operation tracking

2. **Resize Start:**
   - User clicks on resize handle
   - `startResize` function captures:
     - Initial mouse position
     - Current window dimensions
     - Resize direction
   - Event listeners attached to document

3. **Resize Movement:**
   - Mouse movement calculates delta from start position
   - New dimensions calculated based on resize direction
   - Size constraints applied (min/max enforcement)
   - Window state updated with new dimensions

4. **Resize End:**
   - Mouse release removes event listeners
   - Resize state reset to false
   - Final dimensions locked in

### Direction-based Resize Calculations

```typescript
// Example: Southeast corner resize
if (direction.includes('e')) {
  newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
}
if (direction.includes('s')) {
  newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
}
```

### Constraint Enforcement

The system enforces constraints at multiple levels:

1. **Hook Level:** Min/max calculations during resize
2. **CSS Level:** `min-width` and `min-height` properties
3. **Screen Level:** Maximum size based on viewport dimensions

## Integration with Existing Systems

### Draggable Integration
- Resize operations disable window dragging
- `react-draggable` library handles window movement
- Resize handles positioned to not interfere with drag area

### Window Manager Compatibility
- Maintains existing window management features
- Compatible with minimize/maximize operations
- Preserves window state during operations

## CSS Architecture

### Variables and Theming
```css
:root {
  --color-retro-green: #00ff00;
  --color-dark-grey: #706e6e;
  --color-light-grey: #b8b8b8;
  --color-black: #141414;
}
```

### Responsive Design
- Handles adapt to different screen sizes
- Maximum dimensions calculated dynamically
- Scrollbars appear only when needed

## Performance Considerations

### Event Handling
- Uses document-level event listeners during resize
- Automatic cleanup on resize end
- Prevents memory leaks with proper listener removal

### State Management
- Minimal re-renders through optimized state updates
- Uses useCallback for event handlers
- Ref-based tracking for performance-critical data

### CSS Optimization
- Hardware-accelerated transforms where possible
- Efficient scrollbar styling
- Minimal DOM manipulation

## Usage Examples

### Basic Resizable Window
```tsx
<Window
  title="My Window"
  resizable={true}
  minWidth={300}
  minHeight={200}
>
  <div>Content here</div>
</Window>
```

### Fixed-size Window
```tsx
<Window
  title="Fixed Window"
  resizable={false}
  width={400}
  height={300}
>
  <div>Non-resizable content</div>
</Window>
```

### Custom Constraints
```tsx
<Window
  title="Custom Window"
  minWidth={250}
  minHeight={180}
  maxWidth={800}
  maxHeight={600}
>
  <div>Constrained content</div>
</Window>
```

## Browser Compatibility

- **Chrome/Edge:** Full support with webkit scrollbars
- **Firefox:** Fallback to standard scrollbar styling
- **Safari:** Full webkit scrollbar support
- **Mobile:** Touch-friendly resize handles (10px minimum)

## Future Enhancements

### Planned Features
1. **Snap-to-grid:** Align windows to grid during resize
2. **Aspect ratio lock:** Maintain proportions during resize
3. **Double-click edges:** Auto-fit content dimensions
4. **Resize animations:** Smooth transitions during resize
5. **Keyboard shortcuts:** Alt+arrow keys for precise resizing

### Technical Improvements
1. **Performance:** Throttled resize events for better performance
2. **Accessibility:** ARIA labels for resize handles
3. **Touch support:** Mobile-friendly resize gestures
4. **Undo/redo:** Resize history for better UX

## Testing Considerations

### Manual Testing Checklist
- [ ] All 8 resize handles work correctly
- [ ] Minimum size constraints enforced
- [ ] Maximum size constraints enforced
- [ ] Scrolling works when content exceeds window
- [ ] Dragging disabled during resize
- [ ] Cursor changes appropriately
- [ ] No memory leaks on resize operations

### Edge Cases
- Rapid resize movements
- Simultaneous resize attempts
- Window at screen boundaries
- Very small minimum dimensions
- Large content with small windows

## Conclusion

The window resizing architecture provides a robust, user-friendly system for dynamic window management. It maintains the retro aesthetic while providing modern functionality. The modular design allows for easy customization and future enhancements while ensuring compatibility with existing window management systems.
