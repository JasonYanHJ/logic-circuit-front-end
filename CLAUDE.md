# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Architecture

This is a React + Vite frontend application for an integrated circuit design system.

### Core Technologies
- **React 18** with React Router v7 for routing
- **Ant Design** and Ant Design Pro Components for UI
- **GoJS** for circuit diagram visualization and editing
- **Vite** as the build tool and dev server
- **ESLint** for linting (no TypeScript yet)

### Key Structure
- **Authentication**: Token-based auth stored in localStorage, with AuthProvider context
- **API Communication**: Custom request utilities in `src/service/request.jsx` handling JSON and URL-encoded requests, with automatic auth token injection
- **Routing**: Centralized route configuration in `src/module/layout/route.jsx`
- **API Proxy**: Development server proxies `/api` to `http://localhost:2526`

### Main Routes
- `/login` - Authentication page
- `/draw` - Circuit drawing canvas
- `/list` - Saved circuits list
- `/` - Redirects to `/draw`

### API Integration Pattern
- All API calls use the custom `request` wrapper
- Auth tokens are automatically added to headers
- `withMessage` wrapper provides automatic success/error notifications using Ant Design's message component
- API errors are handled with custom `ApiError` class

## GoJS Logic Circuit Integration

### Overview
The project includes a GoJS-based logic circuit editor migrated from `./GoJS-example/samples/logicCircuit.html`. This provides an interactive circuit design canvas with simulation capabilities.

### Required GoJS Extensions
1. **Figures.js** - Provides custom logic gate shapes:
   - `AndGate`, `OrGate`, `XorGate` - Basic logic gates
   - `NandGate`, `NorGate`, `XnorGate` - Gates with inverted outputs
   - `Inverter` - NOT gate
   - Custom port positioning required for gates with output circles

2. **AvoidsLinksRouter.js** - Intelligent link routing:
   - Prevents overlapping of orthogonal links
   - Configurable link spacing (recommend `epsilonDistance: 6`)
   - Automatically avoids nodes when routing

### Key Implementation Details

#### Node Templates
- Use `go.Node('Spot')` for positioning ports
- Input/output ports defined with specific alignments
- Gates use custom figures from Figures.js
- Interactive elements (switches, inputs) handle click events

#### Link Configuration
```javascript
routing: go.Routing.AvoidsNodes,
curve: go.Curve.JumpOver,
corner: 3,
relinkableFrom: true,
relinkableTo: true
```

#### Simulation Logic
- Continuous update loop (250ms intervals)
- Color-based state propagation (green = true/1, red = false/0)
- Logic evaluation functions for each gate type
- Input nodes (batteries, switches) are user-interactive

#### React Integration Approach
1. Create a React component wrapper for the GoJS diagram
2. Initialize diagram in `useEffect` with cleanup
3. Manage diagram instance with `useRef`
4. Handle save/load through React state
5. Integrate with existing auth/API for persistence


### Migration Considerations
- Replace inline event handlers with React event handlers
- Use React state for model persistence
- Integrate with existing API endpoints for saving circuits
- Maintain separation between GoJS logic and React components
- Consider performance optimization for large circuits

## GoJS to React Migration Plan

### File Organization Structure
```
src/module/draw/
├── index.jsx                    # 主入口，整合所有组件
├── components/
│   ├── CircuitDiagram.jsx      # GoJS 图表核心组件
│   ├── CircuitPalette.jsx      # 元件面板组件
│   ├── CircuitToolbar.jsx      # 工具栏（保存、加载等）
│   └── CircuitSimulator.js     # 仿真逻辑（纯 JS）
├── contexts/
│   └── CircuitContext.jsx      # 电路状态管理 Context
├── templates/
│   ├── nodeTemplates.js        # 节点模板定义
│   ├── linkTemplate.js         # 连接线模板
│   └── tooltipTemplate.js      # 工具提示模板
├── utils/
│   ├── gojsConfig.js           # GoJS 配置和初始化
│   ├── circuitLogic.js         # 电路逻辑计算
│   └── constants.js            # 颜色、尺寸等常量
└── extensions/
    ├── Figures.js              # 从 GoJS-example 复制
    └── AvoidsLinksRouter.js    # 从 GoJS-example 复制
```

### Key Implementation Strategies

#### 1. GoJS Instance Isolation
- Use `useRef` to get container element
- Initialize GoJS in `useEffect` with proper cleanup
- Store diagram instance in component state

#### 2. Template Modularization
- Each node type gets its own template factory function
- Templates accept GoJS instance as parameter
- Export all templates from centralized module

#### 3. State Management with Context
- CircuitContext manages circuit model and simulation state
- Provides centralized state for all circuit components
- Enables communication between toolbar, diagram, and palette

#### 4. Simulation Loop Management
- Use React's `useEffect` to manage simulation intervals
- Clean up intervals on component unmount or state change
- Keep simulation logic separate from rendering logic

#### 5. Extension Loading Strategy
- Copy extension files to local project
- Import extensions in gojsConfig.js
- Initialize routers and figures before diagram setup

### Migration Best Practices
1. **Avoid Direct DOM Manipulation** - Let GoJS manage its own container
2. **Lifecycle Synchronization** - Initialize in useEffect, cleanup in return
3. **Event Bridging** - GoJS events trigger React state updates via callbacks
4. **Performance Optimization** - Use React.memo and careful re-render management
5. **Clear Separation of Concerns** - Keep GoJS logic separate from React logic

## Migration Progress

### Completed Tasks

#### 1. Basic Structure Setup ✅
- Created directory structure according to the migration plan
- Set up components, contexts, templates, utils, and extensions directories
- Created placeholder files for organization

#### 2. Core Components Implementation ✅
- **CircuitDiagram.jsx**: GoJS diagram wrapper with proper lifecycle management
- **CircuitPalette.jsx**: Component palette with temporary placeholder elements
- **CircuitToolbar.jsx**: Toolbar with save/load/simulation controls
- **CircuitContext.jsx**: Context provider for state management

#### 3. State Management ✅
- Implemented CircuitContext with:
  - `diagram` and `palette` GoJS instance management
  - `isModified` state to track unsaved changes
  - `isSimulating` state for future simulation features
- Connected components using `useCircuit` hook

#### 4. Save/Load Functionality ✅
- Created `utils/storage.js` for localStorage operations
- Implemented save functionality:
  - Serializes GoJS diagram to JSON
  - Stores with metadata (timestamp, version)
  - Updates UI to show save status
- Implemented load functionality:
  - Retrieves and parses stored data
  - Restores diagram state
  - Shows load confirmation with timestamp
- Integrated modification tracking:
  - GoJS 'Modified' event syncs with React state
  - UI shows "未保存" tag when there are changes
  - Save button becomes primary when modifications exist

### Completed Tasks (Continued)

#### 5. Copy GoJS Extensions ✅
- **Copied extension files**:
  - `Figures.js` - Provides custom logic gate shapes (AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, Inverter)
  - `AvoidsLinksRouter.js` - Intelligent link routing to prevent overlaps
- **Added necessary imports**:
  - Added `import * as go from "gojs"` to both extension files
  - Modified `AvoidsLinksRouter.js` to use ES module export syntax
- **Configured extensions**:
  - Extensions are imported in `gojsConfig.js`
  - AvoidsLinksRouter is configured with `epsilonDistance: 6` for better link spacing
- **Verified functionality**:
  - Tested that logic gate figures are properly registered in GoJS
  - Confirmed figures can be used with `new go.Shape("AndGate")` syntax

#### 6. Project Configuration Updates ✅
- **Created utility files**:
  - `utils/gojsConfig.js` - Centralized GoJS initialization for diagram and palette
  - `utils/constants.js` - Color schemes, sizes, and animation constants
  - `utils/storage.js` - localStorage operations for save/load functionality
- **Updated components to use new configuration**:
  - `CircuitDiagram.jsx` now uses `initializeDiagram()` from gojsConfig
  - `CircuitPalette.jsx` now uses `initializePalette()` from gojsConfig
  - Both components properly import and utilize the configured extensions

### Completed Tasks (Continued)

#### 7. Node Templates Implementation ✅
- **Created template structure**:
  - `templates/nodeStyles.js` - Common styles and helper functions
  - `templates/basicGates.js` - Basic logic gates (AND, OR, XOR, NOT)
  - `templates/invertedGates.js` - Gates with inverted output (NAND, NOR, XNOR)
  - `templates/index.js` - Template management and exports
- **Key design decisions**:
  - Used proper port positioning for each gate type
  - OR/NOR gates: input ports at (0.16, y) due to curved left edge
  - XOR/XNOR gates: input ports at (0.26, y) due to double curve
  - Inverted gates: transparent output port with -5px offset to avoid circle
  - All templates use shared styles for consistency

#### 8. Link Template and Routing ✅
- **Created link template** (`templates/linkTemplate.js`):
  - Orthogonal routing with `go.Routing.AvoidsNodes`
  - Jump-over effect for crossing links
  - Relinkable connections
  - Red color for false state (will change dynamically in simulation)
- **Fixed connection issues**:
  - Added link validation to enforce port connection rules
  - Input ports limited to single connection (`toMaxLinks: 1`)
  - Links connect to specific ports, not node centers
  - Set up proper port ID properties in model
- **AvoidsLinksRouter integration**:
  - Already configured in `gojsConfig.js`
  - Automatically separates parallel links with 6px spacing

#### 9. Template Sharing Architecture ✅
- **Improved architecture**:
  - Templates created once in CircuitContext using `useMemo`
  - Shared between Diagram and Palette via Context
  - Avoids component coupling and follows single responsibility principle
- **Applied templates**:
  - CircuitDiagram uses shared node and link templates
  - CircuitPalette uses shared node templates
  - Both components remain independent

### Next Steps

1. **Implement Interactive Component Templates**
   - Create input component template (battery/power source)
   - Create output component template (LED/lamp)
   - Create switch component template
   - Add click interactions for inputs and switches

2. **Complete Palette Configuration**
   - Add input, output, and switch to palette
   - Optimize palette layout for all components

3. **Implement Circuit Logic (Future)**
   - Port simulation logic from original example
   - Create update loop for circuit state
   - Implement color changes based on circuit state
   - Add interactive animations for switches