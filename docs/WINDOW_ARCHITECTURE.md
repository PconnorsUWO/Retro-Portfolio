# Window System Architecture

## Overview
The window system is a modular, component-based architecture that provides draggable, resizable windows with a retro desktop aesthetic. The system is built with React, TypeScript, and follows separation of concerns principles.

## File Structure

```
src/features/window/
├── index.ts                    # Barrel export for clean imports
├── types.ts                    # TypeScript interfaces and types
├── utils.ts                    # Utility functions for calculations
├── Window.tsx                  # Main window component
├── WindowHeader.tsx            # Window title bar with controls
├── WindowContent.tsx           # Window content area wrapper
├── WindowContext.tsx           # React context for window state
├── ResizeHandle.tsx            # Individual resize handle component
├── ResizeHandles.tsx           # Collection of resize handles
├── CornerTracker.tsx           # Individual corner position tracker
├── CornerTrackers.tsx          # Collection of corner trackers
├── useWindowCorners.ts         # Hook for corner position calculations
├── useWindowDrag.ts            # Hook for drag functionality
└── created-windows/            # Concrete window implementations
    ├── TestWindow.tsx
    └── WindowWithCornerTracking.tsx

src/hooks/
└── useWindowResize.ts          # Core resize logic hook
```

## Type System

### Core Types (`types.ts`)

```typescript
// Window position in 2D space
interface WindowPosition {
  x: number;
  y: number;
}

// Window dimensions
interface WindowSize {
  width: number;
  height: number;
}

// Corner positions for tracking/debugging
interface WindowCorners {
  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

// Resize directions for handles
type ResizeDirection = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

// Main window component props
interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMinimized?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onCornersChange?: (corners: WindowCorners) => void;
  showCornerTrackers?: boolean;
}

// Configuration for resize hook
interface UseWindowResizeOptions {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
}
```

## Core Components

### 1. Window (`Window.tsx`)
**Purpose**: Main window component that orchestrates all window functionality

**Key Features**:
- Integrates all sub-components
- Manages window state through custom hooks
- Provides context to child components
- Handles drag and resize operations

**Dependencies**:
- `WindowProvider` for context
- `useWindowResize` for resize logic
- `useWindowCorners` for corner calculations
- `useWindowDrag` for drag functionality
- `ResizeHandles` for resize interactions
- `CornerTrackers` for debugging

**State Management**:
```typescript
const { size, position, isResizing, startResize, setPosition } = useWindowResize({
  minWidth, minHeight, maxWidth, maxHeight,
  initialWidth: width, initialHeight: height,
  initialX: x, initialY: y
});
```

### 2. WindowHeader (`WindowHeader.tsx`)
**Purpose**: Title bar with window controls

**Features**:
- Displays window title
- Contains minimize/maximize/close buttons
- Acts as drag handle (CSS class: `.window-header`)

**Props**:
```typescript
interface WindowHeaderProps {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}
```

### 3. WindowContent (`WindowContent.tsx`)
**Purpose**: Content area wrapper with styling

**Features**:
- Provides padding and scrolling
- Consistent styling across windows
- Configurable scroll behavior

**Props**:
```typescript
interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}
```

### 4. ResizeHandle (`ResizeHandle.tsx`)
**Purpose**: Individual resize handle for specific directions

**Features**:
- Handles mouse events for resize initiation
- Direction-specific cursor styling
- Visual feedback during resize

**Props**:
```typescript
interface ResizeHandleProps {
  direction: ResizeDirection;
  onMouseDown: (e: React.MouseEvent, direction: ResizeDirection, position: WindowPosition) => void;
  position: WindowPosition;
  isResizing: boolean;
}
```

### 5. ResizeHandles (`ResizeHandles.tsx`)
**Purpose**: Collection component that renders all resize handles

**Features**:
- Renders 8 resize handles (4 corners + 4 edges)
- Conditional rendering based on `resizable` prop
- Coordinates with resize logic

## Custom Hooks

### 1. useWindowResize (`useWindowResize.ts`)
**Purpose**: Core resize logic and state management

**Returns**:
```typescript
{
  size: WindowSize;           // Current window dimensions
  position: WindowPosition;   // Current window position
  isResizing: boolean;        // Resize state flag
  startResize: Function;      // Initiate resize operation
  setSize: Function;          // Update window size
  setPosition: Function;      // Update window position
}
```

**Key Logic**:
- Mouse event handling for resize operations
- Constraint enforcement (min/max dimensions)
- Position adjustment during resize
- Direction-based size calculations

### 2. useWindowCorners (`useWindowCorners.ts`)
**Purpose**: Calculate and track window corner positions

**Returns**:
```typescript
WindowCorners // Calculated corner positions
```

**Features**:
- Memoized corner calculations
- Automatic parent notification via callback
- Derived from position and size

### 3. useWindowDrag (`useWindowDrag.ts`)
**Purpose**: Handle window dragging functionality

**Returns**:
```typescript
{
  handleDrag: (e: any, data: {x: number, y: number}) => void;
}
```

**Features**:
- Position updates during drag
- Respect disabled state during resize
- Integration with react-draggable

## Context System

### WindowContext (`WindowContext.tsx`)
**Purpose**: Share window state across components

**Provides**:
```typescript
interface WindowContextValue {
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
}
```

**Usage**:
- Wrap window components in `WindowProvider`
- Access context with `useWindowContext()`
- Centralized state management

## Utility Functions (`utils.ts`)

### calculateWindowCorners
```typescript
calculateWindowCorners(position: WindowPosition, size: WindowSize): WindowCorners
```
Calculates corner positions based on window position and size.

### getDefaultWindowBounds
```typescript
getDefaultWindowBounds(): { maxWidth: number; maxHeight: number }
```
Returns default maximum window dimensions based on viewport.

### constrainPosition
```typescript
constrainPosition(position: WindowPosition, size: WindowSize, bounds?: {width: number, height: number}): WindowPosition
```
Ensures window position stays within specified bounds.

### constrainSize
```typescript
constrainSize(size: WindowSize, minWidth: number, minHeight: number, maxWidth: number, maxHeight: number): WindowSize
```
Enforces minimum and maximum size constraints.

## Corner Constraint System

### Overview
The corner constraint system allows you to set maximum x and y coordinates for each corner of the window. This is useful for creating bounded areas, safe zones, or specific interaction patterns.

### Types

```typescript
interface WindowCornerConstraints {
  topLeft?: { maxX?: number; maxY?: number };
  topRight?: { maxX?: number; maxY?: number };
  bottomLeft?: { maxX?: number; maxY?: number };
  bottomRight?: { maxX?: number; maxY?: number };
}
```

### Usage

#### Basic Example
```typescript
const constraints: WindowCornerConstraints = {
  topLeft: { maxX: 300, maxY: 200 },
  topRight: { maxX: 800, maxY: 200 },
  bottomLeft: { maxX: 300, maxY: 600 },
  bottomRight: { maxX: 800, maxY: 600 }
};

<Window
  title="Constrained Window"
  cornerConstraints={constraints}
  showCornerTrackers={true}
>
  {/* content */}
</Window>
```

#### Using Utility Functions
```typescript
// Create rectangular boundary
const rectConstraints = createRectangularConstraints({
  left: 100, top: 100, right: 600, bottom: 400
});

// Keep within viewport with margin
const viewportConstraints = createViewportConstraints(50);

// Constrain single corner
const singleCorner = createSingleCornerConstraint('topLeft', 200, 150);
```

### Constraint Processing Flow

1. **Calculate Base Corners**: Standard corner positions from window position/size
2. **Apply Constraints**: Use `applyCornerConstraints()` to enforce max values
3. **Recalculate Window**: Adjust window position/size based on constrained corners
4. **Update Display**: Corner trackers show constrained positions

### Enhanced Resize Constraint System

### Resize Constraint Enforcement

The resize system now enforces corner constraints during resize operations through multiple mechanisms:

1. **Pre-calculation Constraints**: Uses `calculateMaxAllowedSize()` and `calculateMinAllowedPosition()` to determine limits before resizing
2. **Real-time Constraint Checking**: Applies constraints during each mouse movement
3. **Post-resize Validation**: Final constraint check and adjustment after resize calculation

### Resize Direction Handling

Each resize direction now respects corner constraints:

- **East (right edge)**: Limited by `topRight.maxX` and `bottomRight.maxX`
- **West (left edge)**: Limited by `topLeft.maxX` and `bottomLeft.maxX`
- **South (bottom edge)**: Limited by `bottomLeft.maxY` and `bottomRight.maxY`
- **North (top edge)**: Limited by `topLeft.maxY` and `topRight.maxY`
- **Corner handles**: Combination of both X and Y constraints

### Implementation Flow

```typescript
// During resize operation:
1. Calculate base resize values
2. Apply corner constraint limits per direction
3. Validate final position/size against constraints
4. Adjust if any corners exceed limits
5. Update window state with constrained values
```

### Example Usage

```typescript
// Window will not resize beyond these boundaries
const constraints = createRectangularConstraints({
  left: 100, top: 100, right: 800, bottom: 600
});

<Window
  cornerConstraints={constraints}
  resizable={true}
  // Resize handles will respect the boundary limits
/>
```

Both drag and resize operations now work together to maintain the window within the defined corner boundaries.

## Integration Points

### CSS Classes
- `.window-header` - Drag handle identifier
- `.resize-handle` - Base resize handle styling
- `.resize-handle-{direction}` - Direction-specific handles
- `.window-content-scrollable` - Scrollable content area

### External Dependencies
- `react-draggable` - Drag functionality
- Tailwind CSS - Styling system
- Custom retro theme variables

## Extension Points

### Creating New Windows
1. Create component in `created-windows/`
2. Import `Window` from `../`
3. Configure props for specific use case
4. Add window-specific content and handlers

### Custom Resize Logic
1. Extend `UseWindowResizeOptions` interface
2. Add logic to `useWindowResize` hook
3. Update constraint functions in `utils.ts`

### Additional Window Features
1. Add props to `WindowProps` interface
2. Update `Window` component implementation
3. Create specialized hooks if needed
4. Extend context for shared state

## Performance Considerations

- Corner calculations are memoized
- Resize operations use direct DOM manipulation
- Event listeners are properly cleaned up
- Context updates are minimized
- Component re-renders are optimized

## Testing Strategy

- Unit tests for utility functions
- Hook testing with React Testing Library
- Component integration tests
- Resize/drag behavior testing
- Context provider testing
