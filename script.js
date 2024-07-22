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

    const test_range = 50
    const error_range = parseFloat(document.getElementById('error_range').value)*0.5;
    for (let x = -test_range; x <= test_range; x++) {
        for (let y = -test_range; y <= test_range; y++) {
            for (let z = -test_range; z <= test_range; z++) {
                const dist1 = (x-x1)**2 + (y-y1)**2 + (z-z1)**2;
                const dist2 = (x-x2)**2 + (y-y2)**2 + (z-z2)**2;
                const dist3 = (x-x3)**2 + (y-y3)**2 + (z-z3)**2;
                const dist4 = (x-x4)**2 + (y-y4)**2 + (z-z4)**2;

                if (
                    (d1-error_range)**2 <= dist1 && dist1 < (d1+1+error_range)**2 &&
                    (d2-error_range)**2 <= dist2 && dist2 < (d2+1+error_range)**2 &&
                    (d3-error_range)**2 <= dist3 && dist3 < (d3+1+error_range)**2 &&
                    (d4-error_range)**2 <= dist4 && dist4 < (d4+1+error_range)**2
                ) {
                    solutions.push({x, y, z});
                }
            }
        }
    }

    if (solutions.length > 0) {
        const resultText = solutions.map(sol => `(${baseX+sol.x}, ${baseY+sol.y}, ${baseZ+sol.z})`).join(', ');
        document.getElementById('result').innerText = `가능한 좌표: ${resultText}`;
        // 평균 좌표를 계산합니다.
        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        solutions.forEach(sol => {
            sumX += sol.x;
            sumY += sol.y;
            sumZ += sol.z;
        });

        const avgX = sumX / solutions.length;
        const avgY = sumY / solutions.length;
        const avgZ = sumZ / solutions.length;

        const avgResult = `평균: (${(baseX+avgX).toFixed(0)}, ${(baseY+avgY).toFixed(0)}, ${(baseZ+avgZ).toFixed(0)})`;
        document.getElementById('result').innerText += `\n${avgResult}`;

        // document.getElementById('result').innerText += `\n
        // ${d1**2}<=(x-${x1})**2+(y-${y1})**2+(z-${z1})**2<${(d1+1)**2}, 
        // ${d2**2}<=(x-${x2})**2+(y-${y2})**2+(z-${z2})**2<${(d2+1)**2}, 
        // ${d3**2}<=(x-${x3})**2+(y-${y3})**2+(z-${z3})**2<${(d3+1)**2}, 
        // ${d4**2}<=(x-${x4})**2+(y-${y4})**2+(z-${z4})**2<${(d4+1)**2}}`;

    } else {
        document.getElementById('result').innerText = '해를 찾지 못했습니다. 입력이 올바른지 확인하고 허용 오차를 1씩 늘려가며 다시 계산해보세요.';
    }
}
