-- password generator
-- generate a password that is x characters long, includes or does not include numbers, and special characters.

local charset = "abcdefghijklmnopqrstuvwxyz";
local special_charset = "!@#$%^&*()_+{}|:<>?~`-=[];,./"


local function get_random_char()

    local index = math.random(0, string.len(charset)-1);
    local random_bool = math.random() < 0.5;

    if random_bool then
        return string.upper(string.sub(charset, index, index));
    else
        return string.sub(charset, index, index);
    end

end

local function get_random_special_char()

    local index = math.random(0, string.len(special_charset)-1);
    return string.sub(special_charset, index, index);

end

local function generate_password(length, includeNumbers, includeSC)

    local password = "";
    local length_down = length;

    while length_down > 0 do
        
        local rand = math.random(1, 3);

        if rand == 1 then
            password = password .. get_random_char();
            length_down = length_down - 1;
        elseif rand == 2 and includeNumbers then
            password = password .. math.random(1,9);
            length_down = length_down - 1;
        elseif rand == 3 and includeSC then
            password = password .. get_random_special_char();
            length_down = length_down - 1;
        else
            goto continue
        end

        ::continue::
    end

    return password;

end

print(generate_password(16, true, true));