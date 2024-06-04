import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("driver", (table) => {
    table.increments("driver_id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("document", 20).notNullable();
    table.string("car_plate", 10).notNullable();
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("driver");
}