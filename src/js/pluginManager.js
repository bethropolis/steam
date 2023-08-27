import axios from "axios";
import { db } from "../db";

class PluginManager {
    constructor(db) {
        this.db = db;
        this.plugins = [];
    }

    async registerPlugins() {
        const pluginData = await this.db.addons.toArray();

        for (const data of pluginData) {
            try {
                const pluginClass = await import(data.file); // Load plugin class dynamically
                const pluginInstance = new pluginClass();
                this.plugins.push(pluginInstance);
            } catch (error) {
                console.error(`Error loading plugin ${data.name}:`, error);
            }
        }
    }

    async executeMethod(methodName, ...args) {
        const results = await Promise.all(
            this.plugins.map(plugin => plugin.executeMethod(methodName, ...args))
        );
        return results;
    }

    async installPlugin(name, url, description, file) {
        try {
            const response = await axios.get(file); // Fetch the plugin code from the file
            const pluginCode = response.data;

            // Store the plugin code in the addons table
            const id = await this.db.addons.put({
                name,
                url,
                description,
                file: pluginCode // Store the plugin code in the file field
            });

            // Refresh the plugin manager's registered plugins
            await this.registerPlugins();

            return id;
        } catch (error) {
            console.error(`Error installing plugin ${name}:`, error);
            throw error;
        }
    }

    async updatePlugin(id, name, url, description, file) {
        try {
            const response = await axios.get(file);
            const pluginCode = response.data;

            // Update the plugin code in the addons table
            await this.db.addons.update(id, {
                name,
                url,
                description,
                file: pluginCode
            });

            // Refresh the plugin manager's registered plugins
            await this.registerPlugins();
        } catch (error) {
            console.error(`Error updating plugin ${name}:`, error);
            throw error;
        }
    }

    async deletePlugin(id) {
        try {
            // Delete the plugin from the addons table
            await this.db.addons.delete(id);

            // Refresh the plugin manager's registered plugins
            await this.registerPlugins();
        } catch (error) {
            console.error(`Error deleting plugin with ID ${id}:`, error);
            throw error;
        }
    }
}


const pluginManager = new PluginManager(db);

export default pluginManager


