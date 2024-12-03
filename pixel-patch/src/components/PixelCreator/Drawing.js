import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import "../../styles/Drawing.css";
import { BsPaintBucket } from "react-icons/bs";

const Drawing = forwardRef(
  (
    {
      initialGrid = {},
      rowSize = 16,
      columnSize = 16,
      disableGridLines = false,
      disableDrawing = false,
      disableClearGrid = false,
      disableColors = false,
      disableFill = false,
      fillToggle = false,
      cellSize = 1,
    },
    ref
  ) => {
    const [selectedColor, setSelectedColor] = useState("#000"); // Default selected color
    const defaultCellColor = "#fff";
    
    const [showGridLines, setShowGridLines] = useState(!disableGridLines);
    const [enableFill, setFillToggle] = useState(fillToggle);
    const getKey = (row, col) => `${row}-${col}`;
    
    const initializeGrid = (initialGrid, rowSize, columnSize, defaultCellColor) => {
      if (Object.keys(initialGrid).length > 0) {
        return initialGrid;
      }
      const newGrid = {};
      for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < columnSize; col++) {
          const cellKey = getKey(row, col);
          newGrid[cellKey] = initialGrid[cellKey] || defaultCellColor;
        }
      }
      return newGrid;
    };
    const [grid, setGrid] = useState(() =>
      initializeGrid(initialGrid, rowSize, columnSize, defaultCellColor)
    );

    const [isDrawing, setIsDrawing] = useState(false);
    const [gridHistory, setGridHistory] = useState([]); // History of grid states for undo functionality



    const saveHistory = () => {
      setGridHistory((prevHistory) => [...prevHistory, { ...grid }]);
    };

    const undoLastAction = () => {
      if (gridHistory.length > 0) {
        const previousGrid = gridHistory.pop();
        setGridHistory([...gridHistory]); // Update the history stack
        setGrid(previousGrid); // Restore the last grid state
      }
    };

    const generateGrid = () => {
      const gridCells = [];
      for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < columnSize; col++) {
          const key = `${row}-${col}`;
          const cellColor = grid[key];
          gridCells.push(
            <div
              key={key}
              onMouseDown={(e) => handleMouseDown(e, row, col)}
              onMouseEnter={(e) => handleCellInteraction(row, col)}
              onClick={() => !disableDrawing && onCellClick(row, col)}
              style={{
                width: `${cellSize}vw`,
                height: `${cellSize}vw`,
                display: "inline-block",
                backgroundColor: cellColor,
                border: showGridLines ? "1px solid #ccc" : "none",
              }}
            />
          );
        }
      }
      return gridCells;
    };

    const onCellClick = (row, col) => {
      saveHistory(); // Save the current state before modifying
      const cellKey = getKey(row, col);

      if (enableFill) {
        const fillGrid = { ...grid }; // Copy the grid
        const startKey = getKey(row, col);
        const startColor = fillGrid[startKey];
        if (fillGrid[cellKey] === selectedColor) return;

        const stack = [[row, col]]; // Stack to store cells to fill

        while (stack.length > 0) {
          const [r, c] = stack.pop();
          const key = getKey(r, c);
          if (stack.length > 512) break;

          if (fillGrid[key] !== startColor) {
            continue;
          }

          fillGrid[key] = selectedColor;

          if (r > 0) stack.push([r - 1, c]); // Up
          if (r < rowSize - 1) stack.push([r + 1, c]); // Down
          if (c > 0) stack.push([r, c - 1]); // Left
          if (c < columnSize - 1) stack.push([r, c + 1]); // Right
        }

        setGrid(fillGrid); // Update the grid after filling
      } else {
        const newGrid = { ...grid };
        newGrid[cellKey] = selectedColor;
        setGrid(newGrid);
      }
    };

    const handleGlobalMouseUp = () => setIsDrawing(false);

    const handleCellInteraction = (row, col) => {
      if (!disableDrawing && isDrawing) {
        onCellClick(row, col);
      }
    };

    const handleMouseDown = (e, row, col) => {
      e.preventDefault();
      setIsDrawing(true);
      handleCellInteraction(row, col);
    };

    useEffect(() => {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      return () => {
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }, []);

    const clearGridData = () => {
      saveHistory(); // Save the current state before clearing
      const newGrid = {};
      for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < columnSize; col++) {
          const key = getKey(row, col);
          newGrid[key] = defaultCellColor;
        }
      }
      setGrid(newGrid);
    };

    useImperativeHandle(ref, () => ({
      getGridData: () => grid,
      clearGridData,
    }));

    return (
      <div className="drawing-box" style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px" }}>
        {/* Color picker */}
        {!disableColors && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <label>Select Color:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                marginLeft: "10px",
                width: "50px",
                height: "50px",
                border: "none",
                cursor: "pointer",
              }}
            />
          </div>
        )}

        {/* Grid & Controls */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columnSize}, ${cellSize}vw)`,
              border: "2px solid #000",
            }}
          >
            {generateGrid()}
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px", marginTop: "10px" }}>
            {/* Toggle grid lines */}
            {!disableGridLines && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  Show Grid Lines
                  <input
                    type="checkbox"
                    checked={showGridLines}
                    onChange={() => setShowGridLines((prev) => !prev)}
                    className="styled-checkbox"
                  />
                </label>
              </div>
            )}
            {/* Clear grid */}
            {!disableClearGrid && (
              <button onClick={clearGridData}>Clear Grid</button>
            )}
            {/* Undo button */}
            <button onClick={undoLastAction} disabled={gridHistory.length === 0}>
              Undo
            </button>
            {/* Fill toggle */}
            {!disableFill && (
              <span
                style={{
                  cursor: "pointer",
                  color: enableFill ? "blue" : "gray",
                  fontSize: "24px",
                }}
                onClick={() => setFillToggle((prev) => !prev)}
              >
                <BsPaintBucket />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Drawing;
