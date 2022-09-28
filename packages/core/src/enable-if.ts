import { Plugin } from '@envelop/types';

/**
 * This enum is used only internally in order to create nominal type for the disabled plugin
 */
enum EnableIfBranded {
  DisabledPlugin,
}

export type PluginOrDisabledPlugin = Plugin<any> | EnableIfBranded.DisabledPlugin;

export function isPluginEnabled(t: PluginOrDisabledPlugin): t is Plugin {
  return t !== EnableIfBranded.DisabledPlugin && t !== null;
}

/**
 * Utility function to enable a plugin.
 */
export function enableIf<PluginContextType extends Record<any, any> = {}>(
  condition: boolean,
  plugin: Plugin<PluginContextType> | (() => Plugin<PluginContextType>)
): PluginOrDisabledPlugin {
  if (condition) {
    return typeof plugin === 'function' ? plugin() : plugin;
  }
  return EnableIfBranded.DisabledPlugin;
}