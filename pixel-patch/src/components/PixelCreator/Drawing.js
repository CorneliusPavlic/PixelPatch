import React, {useState, useEffect, useImperativeHandle, forwardRef } from "react";
import '../../styles/Drawing.css';


const Drawing = forwardRef(({initialGrid = {}, rowSize=15, columnSize = 15}, ref) => {
    const cellSize = 18;

    // Handles Colors
    const [selectedColor, setSelectedColor] = useState("#000");
    const colors = ["#000", "#FF0000", "#33FF57", "#3357FF", "#F9A825", "#8E24AA", "#fff"]; // List of available colors (change later based on level?)
    const defaultCellColor = "#fff";

    // Handles draw or view mode
    const [mode, setMode] = useState("draw");

    // Handles grid
    const [showGridLines, setShowGridLines] = useState(true); // visible grid lines

    const getKey = (row, col) => { // Gets key based on row and column
        return `${row}-${col}`;
    }

    const initializeGrid = (initialGrid, rowSize, columnSize, defaultCellColor) => {
        // Initial grid already given to us
        if(Object.keys(initialGrid).length > 0){
            return initialGrid;
        }
        // No initial grid -> create default
        const newGrid = {};
        for(let row = 0; row < rowSize; row++){
            for(let col = 0; col < columnSize; col++){
                const cellKey = getKey(row, col);
                newGrid[cellKey] = initialGrid[cellKey] || defaultCellColor;
            }
        }
        return newGrid;
    };
    const [grid, setGrid] = useState(() => initializeGrid(initialGrid, rowSize, columnSize, defaultCellColor));

    // Keeps track of whether the user is pressing and holding
    const [isDrawing, setIsDrawing] = useState(false);

    // Generate the grid to be displayed on screen
    const generateGrid = () => {
        const gridCells = [];
        for(let row = 0; row < rowSize; row++){
            for(let col = 0; col < columnSize; col++){
                const key = `${row}-${col}`;
                const cellColor = grid[key];
                gridCells.push(
                    <div 
                        key={key} // Use flat index as the key
                        onMouseDown={(e) => handleMouseDown(e,row, col)}
                        onMouseEnter={(e) => handleCellInteraction(row, col)}
                        onClick={() => mode === "draw" && onCellClick(row, col)}
                        style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        display: 'inline-block',
                        backgroundColor: cellColor,
                        border: showGridLines ? '1px solid #ccc' : 'none',
                        }}
        />)}}
        return gridCells;
    };

    // Handles clicking on a grid cell -> changes to selected color
    const onCellClick = (row,col) => {
        const cellKey = getKey(row, col);
        const newGrid = {...grid};
        newGrid[cellKey]  = selectedColor;
        setGrid(newGrid);
    }

    // Handle mouse holding + dragging
    const handleGlobalMouseUp = () => {
        setIsDrawing(false);
    };

    const handleCellInteraction = (row, col) => {
        if (mode === "draw" && isDrawing) {
            onCellClick(row, col)
        }
    };

    const handleMouseDown = (e, row, col) => {
        e.preventDefault();
        setIsDrawing(true); // User starts pressing the mouse
        handleCellInteraction(row, col);
    };
        
    useEffect(() => {
        // Add mouseup event listener to the document
        document.addEventListener("mouseup", handleGlobalMouseUp);
    
        // Cleanup on component unmount
        return () => {
          document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
      }, []);

      // Clears the grid
    const clearGridData = () => {
        const newGrid = {};
        for(let row = 0; row < rowSize; row++){
            for(let col = 0; col < columnSize; col++){
                const key = getKey(row, col);
                newGrid[key] = defaultCellColor;
            }
        }
        setGrid(newGrid);
      }

      // Makes getGridData() and clearGridData() visible to the parent
    useImperativeHandle(ref, () => ({
        getGridData: () => grid,
        clearGridData,
      }));

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px" }}>
            {/* Color palette */}
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",}}>
                <div style={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "repeat(2, 30px)",
                    alignItems: "flex-start",
                }} >
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
                                border: selectedColor === color
                                    ? (color === "#000" ? "3px solid #fff" : "3px solid #000")
                                    : "2px solid #999", // Highlight selected
                                boxShadow: selectedColor === color ? "0px 0px 10px rgba(0,0,0,0.2)" : "none",
                                transform: selectedColor === color ? "scale(1.4)" : "scale(1)", // Scale
                                transition: "transform 0.2s ease, box-shadow 0.2s ease", // Transition for scale and shadow
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Grid & Show lines & Clear Grid */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",}}>

                {/* Grid */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columnSize}, ${cellSize}px)`,
                        border: "2px solid #000",
                    }}>
                        {generateGrid()}
                    </div>
                </div>
                {/* Controls below Grid */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px", marginTop: "10px"}}>
                    {/* Toggle button for grid lines */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <label className="switch">
                            <span style={{fontSize: "14px"}}>Show Lines</span>
                            <input
                                type="checkbox"
                                checked={showGridLines}
                                onChange={() => setShowGridLines((prev) => !prev)}
                            />
                            <span className="slider" />
                        </label>
                    </div>
                    {/* Clear button */}
                    <button
                        onClick={clearGridData}
                        style={{
                            fontSize: "13px",
                            backgroundColor: "#808080",
                            transition: "background-color 0.3 ease",
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#808080"}
                    >
                        Clear Grid
                    </button>
                </div>



            </div>
        </div>
    );
});


export default Drawing;
