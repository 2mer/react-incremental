```mermaid
graph TD;

robot ===> energy
energy ===> action
energy ===> mana
mana ===> spell
mana ===> gold
action ===> gold
spell ===> gold
gold ===> upgrade
spell ===> upgrade
upgrade ===> robot
```
