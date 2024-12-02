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

    // Handles Colors
    const [selectedColor, setSelectedColor] = useState("#000");
    const colors = ["#000", "#FF0000", "#33FF57", "#3357FF", "#F9A825", "#8E24AA", "#fff"];
    const defaultCellColor = "#fff";

    // Handles grid lines
    const [showGridLines, setShowGridLines] = useState(!disableGridLines);

    const [enableFill, setFillToggle] = useState(fillToggle);

    // Handles grid
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

    const [grid, setGrid] = useState(() => initializeGrid(initialGrid, rowSize, columnSize, defaultCellColor));

    // Keeps track of whether the user is pressing and holding
    const [isDrawing, setIsDrawing] = useState(false);

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
      if (enableFill) {
        const fillGrid = { ...grid }; // Make a copy of the grid
        const startKey = getKey(row, col);
        const startColor = fillGrid[startKey];
        console.log(startColor);
        // Only proceed if the start cell is white
          const stack = [[row, col]]; // Stack to store the cells to fill
    
          while (stack.length > 0) {
            const [r, c] = stack.pop();
            const key = getKey(r, c);
            if (stack.length > 512) break;
            // Skip if the cell is already filled or if it's not white
            if (fillGrid[key] !== startColor) {
              continue;
            }
    
            // Set the color of the current cell
            fillGrid[key] = selectedColor;
    
            // Add adjacent cells to the stack if they are within bounds
            if (r > 0) stack.push([r - 1, c]); // Up
            if (r < rowSize - 1) stack.push([r + 1, c]); // Down
            if (c > 0) stack.push([r, c - 1]); // Left
            if (c < columnSize - 1) stack.push([r, c + 1]); // Right
          }
    
          setGrid(fillGrid); // Update the grid after filling
      } else {
        const cellKey = getKey(row, col);
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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px" }}>
        {/* Color palette */}
        {!disableColors && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                display: "grid",
                gap: "10px",
                gridTemplateColumns: "repeat(2, 30px)",
                alignItems: "flex-start",
              }}
            >
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: color,
                    cursor: "pointer",
                    borderRadius: "500%",
                    border:
                      selectedColor === color
                        ? color === "#000"
                          ? "3px solid #fff"
                          : "3px solid #000"
                        : "2px solid #999",
                    boxShadow: selectedColor === color ? "0px 0px 10px rgba(0,0,0,0.2)" : "none",
                    transform: selectedColor === color ? "scale(1.4)" : "scale(1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Grid & Show lines & Clear Grid */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* Grid */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnSize}, ${cellSize}vw)`,
                border: "2px solid #000",
              }}
            >
              {generateGrid()}
            </div>
          </div>
          {/* Controls below Grid */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px", marginTop: "10px" }}>
            {/* Toggle button for grid lines */}
            {!disableGridLines && (
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <label className="switch">
                  <span style={{ fontSize: "14px" }}>Show Lines</span>
                  <input
                    type="checkbox"
                    checked={showGridLines}
                    onChange={() => setShowGridLines((prev) => !prev)}
                  />
                  <span className="slider" />
                </label>
              </div>
            )}
            {/* Clear button */}
            {!disableClearGrid && (
              <button
                onClick={clearGridData}
                style={{
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono',monospace",
                  backgroundColor: "#808080",
                  transition: "background-color 0.3 ease",
                }
              }
                onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#808080")}
              >
                Clear Grid
              </button>
              
            )}
      {!disableFill && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
          {/* Only the icon */}
          <span
            style={{
              cursor: 'pointer', // Make the icon clickable
              color: enableFill ? "blue" : "gray", // Change color based on state
              fontSize: '24px', // Set the size of the icon
            }}
            onClick={() => setFillToggle((prev) => !prev)} // Toggle fill state on click
          >
            <BsPaintBucket />
          </span>
          Fill
        </div>
      )}
            
          </div>
        </div>
      </div>
    );
  }
);

export default Drawing;
