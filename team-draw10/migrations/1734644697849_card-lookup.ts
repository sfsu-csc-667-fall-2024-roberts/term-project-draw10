import { MigrationBuilder } from 'node-pg-migrate';

export const up = async (pgm: MigrationBuilder): Promise<void> => {
    pgm.createTable('card_lookup', {
        id: 'id',
        color: { type: 'varchar(20)', notNull: true }, // red, blue, yellow, green, wild
        value: { type: 'varchar(20)', notNull: true }, // 0-9, draw2, reverse, skip, etc.
        is_special: { type: 'boolean', notNull: true, default: false },
    });
    
    pgm.addConstraint('card_lookup', 'unique_card_type', {
        unique: ['color', 'value']
    });
};

export const down = async (pgm: MigrationBuilder): Promise<void> => {
    pgm.dropTable('card_lookup');
};