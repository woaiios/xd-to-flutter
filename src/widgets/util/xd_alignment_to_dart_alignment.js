
function xdAlignmentToDartAlignment(x, y) {
    /// 0 to 1, have to be -1 to 1
    const { fix } = require('../../util');
    const dx = fix(fixAlignment(x));
    const dy = fix(fixAlignment(y));
    const align = `Alignment(${dx},${dy})`;
    return nameAlignment[align] ? nameAlignment[align] : align;
}

const nameAlignment = {
    'Alignment(-1.0,-1.0)': 'Alignment.topLeft',
    'Alignment(1.0,-1.0)': 'Alignment.topRight',
    'Alignment(0.0,-1.0)': 'Alignment.topCenter',
    'Alignment(1.0,0.0)': 'Alignment.centerRight',
    'Alignment(-1.0,0.0)': 'Alignment.centerLeft',
    'Alignment(0.0,0.0)': 'Alignment.center',
    'Alignment(1.0,1.0)': 'Alignment.bottomRight',
    'Alignment(-1.0,1.0)': 'Alignment.bottomLeft',
    'Alignment(0.0,1.0)': 'Alignment.bottomCenter',
}

exports.xdAlignmentToDartAlignment = xdAlignmentToDartAlignment;

/// 0 => -1
/// 0.5 => 0
/// 1 => 1
/// Function = 2x - 1

function fixAlignment(value) {
    return (2 * value) - 1;
}