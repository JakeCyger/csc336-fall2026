local function generate_password(length, include_numbers, include_sc)

    local pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if include_numbers then pool = pool .. "0123456789" end
    if include_sc then pool = pool .. "!@#$%^&*()_+{}|:<>?~`-=[];,./" end

    local chars = {}
    local pool_len = #pool

    for i = 1, length do
        
        local idx = math.random(1, pool_len)
        chars[i] = string.sub(pool, idx, idx)

    end

    return table.concat(chars)

end

print(generate_password(16, true, true));