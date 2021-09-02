object \"Bar\" {
    code {
        let size := datasize(\"runtime\")
        datacopy(0, dataoffset(\"runtime\"), size)
        return(0, size)
    }
    object \"runtime\" {
        code {
            function $$external_foo() -> return_val { {
                return_val := Foo_foo(0)
                leave
            } }
            function $$bar() -> return_val { {
                return_val := 26
                leave
            } }
            function Foo_external_bar(addr) -> return_val {
                let instart := alloc_mstoren(0x4e1a43ff, 4)
                let insize := add(4, add(0, 0))
                pop(abi_encode_())
                pop(call(gas(), addr, 0, instart, insize, 0, 0))
                let outsize := returndatasize()
                let outstart := alloc(outsize)
                returndatacopy(outstart, 0, outsize)
                return_val := abi_decode_data_uint256_mem(outstart, add(outstart, outsize))
            }
            function Foo_foo(addr) -> return_val {
                let instart := alloc_mstoren(0xc2985578, 4)
                let insize := add(4, add(0, 0))
                pop(abi_encode_())
                pop(call(gas(), addr, 0, instart, insize, 0, 0))
                let outsize := returndatasize()
                let outstart := alloc(outsize)
                returndatacopy(outstart, 0, outsize)
                return_val := abi_decode_data_uint256_mem(outstart, add(outstart, outsize))
            }
            function abi_decode_component_uint256_mem(head_start, offset) -> return_val {
                let ptr := add(head_start, offset)
                return_val := mload(ptr)
                if iszero(is_left_padded(0, return_val)) { revert_with_Panic_uint256(153) }
            }
            function abi_decode_data__calldata(head_start, data_end) {
                let encoding_size := sub(data_end, head_start)
                if iszero(eq(encoding_size, 0)) { revert_with_Panic_uint256(153) }
                if iszero(eq(encoding_size, 0)) { revert_with_Panic_uint256(153) }
            }
            function abi_decode_data_uint256_mem(head_start, data_end) -> return_val_0 {
                let encoding_size := sub(data_end, head_start)
                if iszero(eq(encoding_size, 32)) { revert_with_Panic_uint256(153) }
                let head_offset_0 := 0
                let decoded_val_0 := abi_decode_component_uint256_mem(head_start, head_offset_0)
                if iszero(eq(encoding_size, 32)) { revert_with_Panic_uint256(153) }
                return_val_0 := decoded_val_0
            }
            function abi_encode_() -> return_ptr {
                return_ptr := avail()
                let data_offset := 0
            }
            function abi_encode_uint256(encode_val_0) -> return_ptr {
                return_ptr := avail()
                let data_offset := 32
                {
                    let ptr := alloc(32)
                    mstore(ptr, encode_val_0)
                }
            }
            function abi_unpack(mptr, array_size, inner_data_size) { for { let i := 0 } lt(i, array_size) { i := add(i, 1) } {
                let val_ptr := add(mptr, mul(i, inner_data_size))
                let val := mloadn(val_ptr, inner_data_size)
                pop(alloc_mstoren(val, 32))
            } }
            function adjust_numeric_i128(value) -> cleaned { cleaned := signextend(15, value) }
            function adjust_numeric_i16(value) -> cleaned { cleaned := signextend(1, value) }
            function adjust_numeric_i32(value) -> cleaned { cleaned := signextend(3, value) }
            function adjust_numeric_i64(value) -> cleaned { cleaned := signextend(7, value) }
            function adjust_numeric_i8(value) -> cleaned { cleaned := signextend(0, value) }
            function adjust_numeric_u128(value) -> cleaned { cleaned := and(value, 0xffffffffffffffffffffffffffffffff) }
            function adjust_numeric_u16(value) -> cleaned { cleaned := and(value, 0xffff) }
            function adjust_numeric_u32(value) -> cleaned { cleaned := and(value, 0xffffffff) }
            function adjust_numeric_u64(value) -> cleaned { cleaned := and(value, 0xffffffffffffffff) }
            function adjust_numeric_u8(value) -> cleaned { cleaned := and(value, 0xff) }
            function alloc(size) -> ptr {
                ptr := mload(0x00)
                if eq(ptr, 0x00) { ptr := 0x20 }
                mstore(0x00, add(ptr, size))
            }
            function alloc_mstoren(val, size) -> ptr {
                ptr := alloc(size)
                mstoren(ptr, size, val)
            }
            function avail() -> ptr {
                ptr := mload(0x00)
                if eq(ptr, 0x00) { ptr := 0x20 }
            }
            function bytes_mcopys(mptr, sptr, size) {
                let word_ptr := div(sptr, 32)
                mcopys(mptr, word_ptr, size)
            }
            function bytes_scopym(sptr, size) -> mptr {
                let word_ptr := div(sptr, 32)
                mptr := scopym(word_ptr, size)
            }
            function bytes_scopys(ptr1, ptr2, size) {
                let word_ptr1 := div(ptr1, 32)
                let word_ptr2 := div(ptr2, 32)
                scopys(word_ptr1, word_ptr2, size)
            }
            function bytes_sloadn(sptr, size) -> val {
                let word_ptr := div(sptr, 32)
                let bytes_offset := mod(sptr, 32)
                val := sloadn(word_ptr, bytes_offset, size)
            }
            function bytes_sstoren(sptr, size, val) {
                let word_ptr := div(sptr, 32)
                let bytes_offset := mod(sptr, 32)
                sstoren(word_ptr, bytes_offset, size, val)
            }
            function ccopym(cptr, size) -> mptr {
                mptr := alloc(size)
                calldatacopy(mptr, cptr, size)
            }
            function ceil32(n) -> return_val { return_val := mul(div(add(n, 31), 32), 32) }
            function checked_add_i128(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7fffffffffffffffffffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0xffffffffffffffffffffffffffffffff80000000000000000000000000000000, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_i16(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7fff, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_i256(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0x8000000000000000000000000000000000000000000000000000000000000000, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_i32(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7fffffff, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_i64(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7fffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_i8(val1, val2) -> sum {
                if and(iszero(slt(val1, 0)), sgt(val2, sub(0x7f, val1))) { revert_with_Panic_uint256(17) }
                if and(slt(val1, 0), slt(val2, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80, val1))) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u128(val1, val2) -> sum {
                if gt(val1, sub(0xffffffffffffffffffffffffffffffff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u16(val1, val2) -> sum {
                if gt(val1, sub(0xffff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u256(val1, val2) -> sum {
                if gt(val1, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u32(val1, val2) -> sum {
                if gt(val1, sub(0xffffffff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u64(val1, val2) -> sum {
                if gt(val1, sub(0xffffffffffffffff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_add_u8(val1, val2) -> sum {
                if gt(val1, sub(0xff, val2)) { revert_with_Panic_uint256(17) }
                sum := add(val1, val2)
            }
            function checked_div_i128(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0xffffffffffffffffffffffffffffffff80000000000000000000000000000000), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_i16(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_i256(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0x8000000000000000000000000000000000000000000000000000000000000000), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_i32(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_i64(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_i8(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                if and(eq(val1, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80), eq(val2, sub(0, 1))) { revert_with_Panic_uint256(17) }
                result := sdiv(val1, val2)
            }
            function checked_div_unsigned(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                result := div(val1, val2)
            }
            function checked_exp_helper(_power, _base, exponent, max) -> power, base {
                power := _power
                base := _base
                for { } gt(exponent, 1) { } {
                    if gt(base, div(max, base)) { revert_with_Panic_uint256(17) }
                    if and(exponent, 1) { power := mul(power, base) }
                    base := mul(base, base)
                    exponent := shr(1, exponent)
                }
            }
            function checked_exp_i128(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0xffffffffffffffffffffffffffffffff80000000000000000000000000000000, 0x7fffffffffffffffffffffffffffffff) }
            function checked_exp_i16(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000, 0x7fff) }
            function checked_exp_i256(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0x8000000000000000000000000000000000000000000000000000000000000000, 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) }
            function checked_exp_i32(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000, 0x7fffffff) }
            function checked_exp_i64(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000, 0x7fffffffffffffff) }
            function checked_exp_i8(base, exponent) -> power { power := checked_exp_signed(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80, 0x7f) }
            function checked_exp_signed(base, exponent, min, max) -> power {
                switch exponent
                case 0 {
                    power := 1
                    leave
                }
                case 1 {
                    power := base
                    leave
                }
                if iszero(base) {
                    power := 0
                    leave
                }
                power := 1
                switch sgt(base, 0)
                case 1 { if gt(base, div(max, base)) { revert_with_Panic_uint256(17) } }
                case 0 { if slt(base, sdiv(max, base)) { revert_with_Panic_uint256(17) } }
                if and(exponent, 1) { power := base }
                base := mul(base, base)
                exponent := shr(1, exponent)
                power, base := checked_exp_helper(power, base, exponent, max)
                if and(sgt(power, 0), gt(power, div(max, base))) { revert_with_Panic_uint256(17) }
                if and(slt(power, 0), slt(power, sdiv(min, base))) { revert_with_Panic_uint256(17) }
                power := mul(power, base)
            }
            function checked_exp_u128(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xffffffffffffffffffffffffffffffff) }
            function checked_exp_u16(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xffff) }
            function checked_exp_u256(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) }
            function checked_exp_u32(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xffffffff) }
            function checked_exp_u64(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xffffffffffffffff) }
            function checked_exp_u8(base, exponent) -> power { power := checked_exp_unsigned(base, exponent, 0xff) }
            function checked_exp_unsigned(base, exponent, max) -> power {
                if iszero(exponent) {
                    power := 1
                    leave
                }
                if iszero(base) {
                    power := 0
                    leave
                }
                switch base
                case 1 {
                    power := 1
                    leave
                }
                case 2 {
                    if gt(exponent, 255) { revert_with_Panic_uint256(17) }
                    power := exp(2, exponent)
                    if gt(power, max) { revert_with_Panic_uint256(17) }
                    leave
                }
                if and(sgt(power, 0), gt(power, div(max, base))) { revert_with_Panic_uint256(17) }
                if or(and(lt(base, 11), lt(exponent, 78)), and(lt(base, 307), lt(exponent, 32))) {
                    power := exp(base, exponent)
                    if gt(power, max) { revert_with_Panic_uint256(17) }
                    leave
                }
                power, base := checked_exp_helper(1, base, exponent, max)
                if gt(power, div(max, base)) { revert_with_Panic_uint256(17) }
                power := mul(power, base)
            }
            function checked_mod_signed(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                result := smod(val1, val2)
            }
            function checked_mod_unsigned(val1, val2) -> result {
                if iszero(val2) { revert_with_Panic_uint256(18) }
                result := mod(val1, val2)
            }
            function checked_mul_i128(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7fffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0xffffffffffffffffffffffffffffffff80000000000000000000000000000000, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0xffffffffffffffffffffffffffffffff80000000000000000000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7fffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_i16(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7fff, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7fff, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_i256(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0x8000000000000000000000000000000000000000000000000000000000000000, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0x8000000000000000000000000000000000000000000000000000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_i32(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7fffffff, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7fffffff, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_i64(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7fffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7fffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_i8(val1, val2) -> product {
                if and(and(sgt(val1, 0), sgt(val2, 0)), gt(val1, div(0x7f, val2))) { revert_with_Panic_uint256(17) }
                if and(and(sgt(val1, 0), slt(val2, 0)), slt(val2, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80, val1))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), sgt(val2, 0)), slt(val1, sdiv(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80, val2))) { revert_with_Panic_uint256(17) }
                if and(and(slt(val1, 0), slt(val2, 0)), slt(val1, sdiv(0x7f, val2))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u128(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xffffffffffffffffffffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u16(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xffff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u256(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u32(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xffffffff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u64(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xffffffffffffffff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_mul_u8(val1, val2) -> product {
                if and(iszero(iszero(val1)), gt(val2, div(0xff, val1))) { revert_with_Panic_uint256(17) }
                product := mul(val1, val2)
            }
            function checked_sub_i128(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0xffffffffffffffffffffffffffffffff80000000000000000000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7fffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_i16(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7fff, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_i256(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0x8000000000000000000000000000000000000000000000000000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_i32(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7fffffff, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_i64(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0xffffffffffffffffffffffffffffffffffffffffffffffff8000000000000000, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7fffffffffffffff, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_i8(val1, val2) -> diff {
                if and(iszero(slt(val2, 0)), slt(val1, add(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80, val2))) { revert_with_Panic_uint256(17) }
                if and(slt(val2, 0), sgt(val1, add(0x7f, val2))) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function checked_sub_unsigned(val1, val2) -> diff {
                if lt(val1, val2) { revert_with_Panic_uint256(17) }
                diff := sub(val1, val2)
            }
            function cloadn(ptr, size) -> val { val := shr(sub(256, mul(8, size)), calldataload(ptr)) }
            function contract_create(data_ptr, data_size, value) -> return_address {
                let mptr := alloc(data_size)
                datacopy(mptr, data_ptr, data_size)
                return_address := create(value, mptr, data_size)
            }
            function contract_create2(data_ptr, data_size, value, salt) -> return_address {
                let mptr := alloc(data_size)
                datacopy(mptr, data_ptr, data_size)
                return_address := create2(value, mptr, data_size, salt)
            }
            function free(ptr) { mstore(0x00, ptr) }
            function is_left_padded(size_bits, val) -> return_val {
                let bits_shifted := sub(256, size_bits)
                let shifted_val := shr(bits_shifted, val)
                return_val := iszero(shifted_val)
            }
            function is_right_padded(size_bits, val) -> return_val {
                let bits_shifted := sub(256, size_bits)
                let shifted_val := shl(bits_shifted, val)
                return_val := iszero(shifted_val)
            }
            function load_data_string(code_ptr, size) -> mptr {
                mptr := alloc(32)
                mstore(mptr, size)
                let content_ptr := alloc(size)
                datacopy(content_ptr, code_ptr, size)
            }
            function map_value_ptr(a, b) -> return_val {
                let ptr := avail()
                mstore(ptr, a)
                mstore(add(ptr, 32), b)
                let hash := keccak256(ptr, 64)
                return_val := set_zero(248, 256, hash)
            }
            function mcopym(ptr1, size) -> ptr2 {
                ptr2 := alloc(size)
                let offset := 0
                for { } lt(add(offset, 32), size) { } {
                    let _ptr1 := add(ptr1, offset)
                    let _ptr2 := add(ptr2, offset)
                    mstore(_ptr2, mload(_ptr1))
                    offset := add(offset, 32)
                }
                let rem := sub(size, offset)
                if gt(rem, 0) {
                    let _ptr1 := add(ptr1, offset)
                    let _ptr2 := add(ptr2, offset)
                    mstoren(_ptr2, rem, mloadn(_ptr1, rem))
                }
            }
            function mcopys(mptr, sptr, size) {
                let mptr_offset := 0
                let sptr_offset := 0
                for { } lt(add(mptr_offset, 32), size) { } {
                    let _mptr := add(mptr, mptr_offset)
                    let _sptr := add(sptr, sptr_offset)
                    sstore(_sptr, mload(_mptr))
                    mptr_offset := add(mptr_offset, 32)
                    sptr_offset := add(sptr_offset, 1)
                }
                let rem := sub(size, mptr_offset)
                if gt(rem, 0) {
                    let _mptr := add(mptr, mptr_offset)
                    let _sptr := add(sptr, sptr_offset)
                    let zeroed_val := set_zero(mul(rem, 8), 256, mload(_mptr))
                    sstore(_sptr, zeroed_val)
                }
            }
            function mloadn(ptr, size) -> val { val := shr(sub(256, mul(8, size)), mload(ptr)) }
            function mstoren(ptr, size, val) {
                let size_bits := mul(8, size)
                let left := shl(sub(256, size_bits), val)
                let right := shr(size_bits, mload(add(ptr, size)))
                mstore(ptr, or(left, right))
            }
            function revert_with_Panic_uint256(val) {
                let ptr := alloc_mstoren(0x4e487b71, 4)
                pop(abi_encode_uint256(val))
                revert(ptr, add(4, add(32, 0)))
            }
            function scopym(sptr, size) -> mptr {
                mptr := alloc(size)
                let mptr_offset := 0
                let sptr_offset := 0
                for { } lt(add(mptr_offset, 32), size) { } {
                    let _mptr := add(mptr, mptr_offset)
                    let _sptr := add(sptr, sptr_offset)
                    mstore(_mptr, sload(_sptr))
                    mptr_offset := add(mptr_offset, 32)
                    sptr_offset := add(sptr_offset, 1)
                }
                let rem := sub(size, mptr_offset)
                if gt(rem, 0) {
                    let _mptr := add(mptr, mptr_offset)
                    let _sptr := add(sptr, sptr_offset)
                    mstoren(_mptr, rem, sloadn(_sptr, 0, rem))
                }
            }
            function scopys(ptr1, ptr2, size) {
                let word_size := div(add(size, 31), 32)
                let offset := 0
                for { } lt(add(offset, 1), size) { } {
                    let _ptr1 := add(ptr1, offset)
                    let _ptr2 := add(ptr2, offset)
                    sstore(_ptr2, sload(_ptr1))
                    offset := add(offset, 1)
                }
            }
            function set_zero(start_bit, end_bit, val) -> result {
                let left_shift_dist := sub(256, start_bit)
                let right_shift_dist := end_bit
                let left := shl(left_shift_dist, shr(left_shift_dist, val))
                let right := shr(right_shift_dist, shl(right_shift_dist, val))
                result := or(left, right)
            }
            function sloadn(word_ptr, bytes_offset, bytes_size) -> val {
                let bits_offset := mul(bytes_offset, 8)
                let bits_size := mul(bytes_size, 8)
                let bits_padding := sub(256, bits_size)
                let word := sload(word_ptr)
                let word_shl := shl(bits_offset, word)
                val := shr(bits_padding, word_shl)
            }
            function sstoren(word_ptr, bytes_offset, bytes_size, val) {
                let bits_offset := mul(bytes_offset, 8)
                let bits_size := mul(bytes_size, 8)
                let old_word := sload(word_ptr)
                let zeroed_word := set_zero(bits_offset, add(bits_offset, bits_size), old_word)
                let left_shift_dist := sub(sub(256, bits_size), bits_offset)
                let offset_val := shl(left_shift_dist, val)
                let new_word := or(zeroed_word, offset_val)
                sstore(word_ptr, new_word)
            }
            function ternary(test, if_expr, else_expr) -> result { switch test
            case 1 { result := if_expr }
            case 0 { result := else_expr } }
            switch cloadn(0, 4)
            case 0xd9082999 {
                let return_val := $$external_foo()
                let encoding_start := abi_encode_uint256(return_val)
                let encoding_size := add(32, 0)
                return(encoding_start, encoding_size)
            }
            case 0xfebb0f7e {
                let return_val := $$bar()
                let encoding_start := abi_encode_uint256(return_val)
                let encoding_size := add(32, 0)
                return(encoding_start, encoding_size)
            }
            default { return(0, 0) }
        }
    }
}