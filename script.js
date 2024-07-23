function insertExampleValues(){
    document.getElementById('basePosX').value = 100
    document.getElementById('basePosY').value = 200
    document.getElementById('basePosZ').value = 300
    document.getElementById('x1').value = 0
    document.getElementById('y1').value = 0
    document.getElementById('z1').value = 0
    document.getElementById('d1').value = 14

    document.getElementById('x2').value = 5
    document.getElementById('y2').value = 0
    document.getElementById('z2').value = 0
    document.getElementById('d2').value = 10

    document.getElementById('x3').value = 5
    document.getElementById('y3').value = 0
    document.getElementById('z3').value = 5
    document.getElementById('d3').value = 11

    document.getElementById('x4').value = 5
    document.getElementById('y4').value = 5
    document.getElementById('z4').value = 5
    document.getElementById('d4').value = 9
}
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
    
    requestRemoveSpheres();
    requestCreateTransSphere(baseX+x1,baseY+y1,baseZ+z1,d1,1,0.5);
    requestCreateTransSphere(baseX+x2,baseY+y2,baseZ+z2,d2,2,0.5);
    requestCreateTransSphere(baseX+x3,baseY+y3,baseZ+z3,d3,3,0.5);
    requestCreateTransSphere(baseX+x4,baseY+y4,baseZ+z4,d4,4,0.5);

    let solutions = [];

    const test_range = 50
    const error_range = parseFloat(document.getElementById('error_range').value)*0.125;
    for (let x = -test_range; x <= test_range; x++) {
        for (let y = -test_range; y <= test_range; y++) {
            for (let z = -test_range; z <= test_range; z++) {
                const dist1 = (x-x1)**2 + (y-y1)**2 + (z-z1)**2;
                const dist2 = (x-x2)**2 + (y-y2)**2 + (z-z2)**2;
                const dist3 = (x-x3)**2 + (y-y3)**2 + (z-z3)**2;
                const dist4 = (x-x4)**2 + (y-y4)**2 + (z-z4)**2;

                if (
                    (d1-0.25-error_range)**2 <= dist1 && dist1 < (d1+0.25+error_range)**2 &&
                    (d2-0.25-error_range)**2 <= dist2 && dist2 < (d2+0.25+error_range)**2 &&
                    (d3-0.25-error_range)**2 <= dist3 && dist3 < (d3+0.25+error_range)**2 &&
                    (d4-0.25-error_range)**2 <= dist4 && dist4 < (d4+0.25+error_range)**2
                ) {
                    solutions.push({x, y, z});
                }
            }
        }
    }
    requestRemoveCubes();
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
            requestCreateCube(baseX+sol.x, baseY+sol.y, baseZ+sol.z)
            console.log(baseX+sol.x, baseY+sol.y, baseZ+sol.z)
        });

        const avgX = sumX / solutions.length;
        const avgY = sumY / solutions.length;
        const avgZ = sumZ / solutions.length;

        const avgResult = `평균: (${(baseX+avgX).toFixed(0)}, ${(baseY+avgY).toFixed(0)}, ${(baseZ+avgZ).toFixed(0)})`;
        document.getElementById('result').innerText += `\n${avgResult}`;
        requestViewTo(baseX+avgX,baseY+avgY,baseZ+avgZ);
        console.log(baseX+avgX, baseY+avgY, baseZ+avgZ)

    } else {
        document.getElementById('result').innerText = '해를 찾지 못했습니다. 입력이 올바른지 확인하고 허용 오차를 1씩 늘려가며 다시 계산해보세요.';
    }
    function requestCreateTransSphere(x, y, z, r, cID, opacity) {
        const iframe = document.getElementById('threejs-frame');
        iframe.contentWindow.postMessage({
            type: 'createTransSphere',
            x: x,
            y: y,
            z: z,
            r: r,
            cID: cID,
            opacity: opacity
        }, '*');
    }
    function requestCreateCube(x, y, z) {
        const iframe = document.getElementById('threejs-frame');
        iframe.contentWindow.postMessage({
            type: 'createCube',
            x: x,
            y: y,
            z: z
        }, '*');
    }
    function requestRemoveSpheres() {
        const iframe = document.getElementById('threejs-frame');
        iframe.contentWindow.postMessage({
            type: 'removeSpheres'
        }, '*');
    }
    function requestRemoveCubes() {
        const iframe = document.getElementById('threejs-frame');
        iframe.contentWindow.postMessage({
            type: 'removeCubes'
        }, '*');
    }
    function requestViewTo(x,y,z) {
        const iframe = document.getElementById('threejs-frame');
        iframe.contentWindow.postMessage({
            type: 'viewTo',
            x:x,
            y:y,
            z:z
        }, '*');
    }
}
