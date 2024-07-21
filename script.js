function calculateTrilateration() {
    const baseX = parseFloat(document.getElementById('basePosX').value);
    const baseY = parseFloat(document.getElementById('basePosY').value);
    const baseZ = parseFloat(document.getElementById('basePosZ').value);
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const z1 = parseFloat(document.getElementById('z1').value);
    const d1 = parseFloat(document.getElementById('d1').value);

    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);
    const z2 = parseFloat(document.getElementById('z2').value);
    const d2 = parseFloat(document.getElementById('d2').value);

    const x3 = parseFloat(document.getElementById('x3').value);
    const y3 = parseFloat(document.getElementById('y3').value);
    const z3 = parseFloat(document.getElementById('z3').value);
    const d3 = parseFloat(document.getElementById('d3').value);

    const x4 = parseFloat(document.getElementById('x4').value);
    const y4 = parseFloat(document.getElementById('y4').value);
    const z4 = parseFloat(document.getElementById('z4').value);
    const d4 = parseFloat(document.getElementById('d4').value);

    let solutions = [];

    let range = 50
    for (let x = -range; x <= range; x++) {
        for (let y = -range; y <= range; y++) {
            for (let z = -range; z <= range; z++) {
                const dist1 = (x-x1)**2 + (y-y1)**2 + (z-z1)**2;
                const dist2 = (x-x2)**2 + (y-y2)**2 + (z-z2)**2;
                const dist3 = (x-x3)**2 + (y-y3)**2 + (z-z3)**2;
                const dist4 = (x-x4)**2 + (y-y4)**2 + (z-z4)**2;

                if (
                    (d1)**2 <= dist1 && dist1 < (d1+1)**2 &&
                    (d2)**2 <= dist2 && dist2 < (d2+1)**2 &&
                    (d3)**2 <= dist3 && dist3 < (d3+1)**2 &&
                    (d4)**2 <= dist4 && dist4 < (d4+1)**2
                ) {
                    solutions.push({x, y, z});
                }
            }
        }
    }

    if (solutions.length > 0) {
        const resultText = solutions.map(sol => `(${baseX+sol.x}, ${baseY+sol.y}, ${baseZ+sol.z})`).join(', ');
        document.getElementById('result').innerText = `Possible solutions: ${resultText}`;
    } else {
        document.getElementById('result').innerText = 'No solutions found.';
    }
}
