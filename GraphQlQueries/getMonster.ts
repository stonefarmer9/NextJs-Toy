import { gql } from "@apollo/client";

export const GET_MONSTER = gql`
  query Monster($filter: FilterFindOneMonsterInput) {
    monster(filter: $filter) {
      actions {
        name
        desc
        attack_bonus
        damage {
          damage_dice
          damage_type {
            index
            name
            url
          }
        }
        dc {
          dc_type {
            index
            name
            url
          }
          dc_value
          success_type
        }
        options {
          choose
          from {
            name
            count
            type
          }
        }
        usage {
          type
          dice
          min_value
        }
        attack_options {
          choose
          type
          from {
            name
          }
        }
        attacks {
          name
        }
      }
      alignment
      armor_class
      challenge_rating
      charisma
      condition_immunities {
        index
        name
        url
      }
      constitution
      damage_immunities
      damage_resistances
      damage_vulnerabilities
      dexterity
      forms {
        index
        name
        url
      }
      hit_dice
      hit_points
      index
      intelligence
      languages
      legendary_actions {
        name
        desc
        attack_bonus
      }
      name
      proficiencies {
        proficiency {
          index
          name
          url
        }
        value
      }
      reactions {
        name
        desc
      }
      senses {
        blindsight
        darkvision
        passive_perception
        tremorsense
        truesight
      }
      size
      special_abilities {
        name
        desc
        attack_bonus
        spellcasting {
          level
          ability {
            index
            name
            url
          }
          dc
          modifier
          components_required
          school
          slots
          spells {
            name
            level
            url
            notes
          }
        }
        usage {
          type
          times
          rest_types
        }
      }
      speed {
        burrow
        climb
        fly
        hover
        swim
        walk
      }
      strength
      subtype
      type
      url
      wisdom
      xp
    }
  }
`;
