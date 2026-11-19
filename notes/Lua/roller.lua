-- make a gacha roller type deal with different weights etc

local rarity_table = {
    {"common", 59},
    {"rare", 25},
    {"epic", 12},
    {"legendary", 3},
    {"mythic", 1},
}

local total_weight = 0;

for _, entry in ipairs(rarity_table) do
    total_weight = total_weight + entry[2];
end

local function get_item()

    local rand = math.random(1, total_weight);
    local count = 0;

    for i = 1, #rarity_table do
        count = count + rarity_table[i][2];
        if rand <= count then
            return (rarity_table[i][1]);
        end
    end

end

local counts = {
    common = 0,
    rare = 0,
    epic = 0,
    legendary = 0,
    mythic = 0,
};

for i = 1, 100 do
    local item = get_item();
    print("You got a " .. item .. " item!");
    counts[item] = counts[item] + 1
end

for i, v in pairs(counts) do
    print(i, v);
end