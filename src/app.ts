import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import 'dotenv/config';
import { Client, Intents } from 'discord.js';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!
  const client = new Client({ intents: [Intents.FLAGS.GUILDS]});
  const token = process.env.DISCORD_TOKEN;

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.login(token);
  // Do not touch the following lines
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
