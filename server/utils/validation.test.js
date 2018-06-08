const {isRealString} = require('./../utils/validation');
const expect = require('expect');

describe('isRealString', ()=>{
    var nonStringResult = isRealString(123);
    var spacesResult = isRealString('   ');
    var validStringResult = isRealString('MoHamed');
    it('should reject non-string values',()=>{
        expect(nonStringResult).toBe(false);
        
        
    });
    it('should reject string with only spaces',()=>{
        expect(spacesResult).toBe(false);
    });
    it('should allow string with non-space characters',()=>{
        expect(validStringResult).toBe(true);
    });
})
