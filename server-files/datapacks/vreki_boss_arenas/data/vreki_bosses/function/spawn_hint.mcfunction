# Macro: chat line that puts the boss spawn command in the chat box (the world name may need changing).
$tellraw @s [{"text":"Arena placed. ","color":"gold"},{"text":"[Click here, then press Enter to spawn the boss]","color":"red","underlined":true,"click_event":{"action":"suggest_command","command":"/mm mobs spawn $(boss) 1 world,$(x),$(y),$(z)"}}]
