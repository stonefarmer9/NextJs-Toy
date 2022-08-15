import { gql } from "@apollo/client";

export const GET_MONSTER = gql`
  query Query($monsterIndex: String) {
    monster(index: $monsterIndex) {
      name
      desc
      charisma
      strength
      intelligence
      dexterity
      wisdom
      constitution
      index
      actions {
        actions {
          action_name
        }
        name
        damage {
          damage_dice
          damage_type {
            name
            desc
          }
        }
        attack_bonus

        desc
      }
    }
  }
`;
