const config = {
    GITHUB_TOKEN: process.env.TOKEN || '',
    REPO_OWNER: 'tenstudiosbc',
    REPO_NAME: 'ssiavanguardchronicles',
    isTokenValid() {
        return Boolean(this.GITHUB_TOKEN);
    }
};

// Warn if token is missing
if (!config.isTokenValid()) {
    console.warn('GitHub token is missing. Some features may not work.');
}
