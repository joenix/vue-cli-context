/**
 * @param pkg {object}
 * ======== ======== ========
 */
function rip(pkg = {}) {
  return pkg.default === undefined ? pkg : pkg.default;
}

/**
 * @param inject {object}
 * @param pkg {any}
 * ======== ======== ========
 */
function bif(pkg, inject) {
  return inject ? pkg(inject) : pkg;
}

/**
 * @param name {string}
 * @param pkg {any}
 * ======== ======== ========
 */
function insert(name, pkg, packages) {
  if (typeof pkg === `function`) {
    return (packages[name] = pkg);
  }
  if (pkg.name === `_default`) {
    return (packages[name] = pkg);
  }
  return (packages[pkg.name || name] = pkg);
}

/**
 * @param context {object}
 * ======== ======== ========
 */
function offer({ context, expect, inject }, packages = {}) {
  // If no Context
  if (context === undefined) {
    return packages;
  }
  // Use Context in Require
  if (context.constructor !== Function) {
    return context;
  }

  // Packages
  context.keys().map((key) => {
    // file name
    const name = key.replace(/.*\/([\w\-]+)\.\w+$/, "$1");
    // rip pkg
    const pkg = expect(bif(rip(context(key)), inject));
    // insert packages
    insert(name, pkg, packages);
  });

  // Result
  return packages;
}

/**
 * @param context {object}
 * @param sync {boolean}
 * ======== ======== ========
 */
function contextual(
  // Options
  options,
  // Sync
  sync = true
) {
  return sync
    ? new Promise((resolve) => resolve(offer(options)))
    : offer(options);
}

export default contextual;
