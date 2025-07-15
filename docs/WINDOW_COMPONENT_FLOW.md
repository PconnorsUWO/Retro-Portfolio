# Window System Component Flow

## Component Hierarchy

```
Window (Main Container)
├── WindowProvider (Context)
├── Draggable (react-draggable)
│   └── WindowContainer
│       ├── WindowHeader
│       │   ├── Title
│       │   └── Controls
│       │       ├── MinimizeButton
│       │       ├── MaximizeButton
│       │       └── CloseButton
│       ├── WindowContent
│       │   └── {children}
│       └── ResizeHandles
│           ├── ResizeHandle (nw)
│           ├── ResizeHandle (ne)
│           ├── ResizeHandle (sw)
│           ├── ResizeHandle (se)
│           ├── ResizeHandle (n)
│           ├── ResizeHandle (s)
│           ├── ResizeHandle (w)
│           └── ResizeHandle (e)
└── CornerTrackers (Debug)
    ├── CornerTracker (topLeft)
    ├── CornerTracker (topRight)
    ├── CornerTracker (bottomLeft)
    └── CornerTracker (bottomRight)
```

## Hook Dependencies

```
Window.tsx
├── useWindowResize() → size, position, isResizing, startResize, setPosition
├── useWindowCorners() → corners (calculated from position + size)
├── useWindowDrag() → handleDrag
└── useWindowContext() → isResizing, setIsResizing
```

## State Flow

```
User Action → Hook → State Update → Component Re-render

Examples:
1. Drag Window:
   User drags header → useWindowDrag → setPosition → Window re-renders

2. Resize Window:
   User drags handle → useWindowResize → size/position update → Window re-renders

3. Corner Tracking:
   Position/Size change → useWindowCorners → corners recalculated → CornerTrackers update
```

## Data Dependencies

```
WindowProps (initial) → useWindowResize → WindowState
                     ↓
WindowState → useWindowCorners → WindowCorners
           ↓
WindowState → useWindowDrag → DragHandlers
           ↓
WindowState → ResizeHandles → ResizeHandlers
           ↓
WindowCorners → CornerTrackers → CornerDisplay
```

## Corner Constraint Flow

```
Corner Constraints → Calculate Bounds → react-draggable bounds → Drag Limitation

Examples:
1. Drag Window with Constraints:
   Corner constraints → calculateDraggableBounds() → Draggable bounds prop → Native drag limitation

2. Resize Window with Constraints:
   User drags handle → useWindowResize → Check corner constraints → Adjust size/position → Window re-renders

3. Bounds Calculation:
   Corner constraints → Analyze each corner limit → Calculate min/max X/Y → Convert to draggable bounds
```

## Enhanced Data Dependencies

```
WindowProps (cornerConstraints) → useWindowDrag → Calculated bounds → Draggable bounds prop
                                ↓
WindowState + cornerConstraints → useWindowResize → WindowState (constrained)
                                ↓
WindowState → useWindowCorners → WindowCorners (constrained)
            ↓
WindowCorners → CornerTrackers → CornerDisplay (shows constrained positions)
```

## Bounds Processing

```
Corner Constraints → calculateDraggableBounds() → { left, top, right, bottom } → 
Draggable bounds prop → Native drag limitation
```

The constraint system now leverages react-draggable's native bounds functionality for smoother drag operations, while resize operations still use constraint checking logic.
