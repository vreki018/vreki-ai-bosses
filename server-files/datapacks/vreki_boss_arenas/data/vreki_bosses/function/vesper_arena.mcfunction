# Places vesper_arena (64 x 64) around you: you stay on the player start facing the boss spot (23 blocks north), then chat offers the spawn command for that spot.
place template vreki_bosses:vesper_arena ~-32 ~-9 ~-50
tp @s ~ ~ ~ 180 0
kill @e[type=item,distance=..80]
execute positioned ~0 ~ ~-23 summon minecraft:marker run tag @s add vreki_bosses_spot
data modify storage vreki_bosses:spawn boss set value "Vesper_Bellwarden"
execute store result storage vreki_bosses:spawn x int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[0]
execute store result storage vreki_bosses:spawn y int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[1]
execute store result storage vreki_bosses:spawn z int 1 run data get entity @n[type=minecraft:marker,tag=vreki_bosses_spot] Pos[2]
kill @e[type=minecraft:marker,tag=vreki_bosses_spot]
function vreki_bosses:spawn_hint with storage vreki_bosses:spawn
