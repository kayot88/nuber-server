export const privatResolver = resolverFn => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT. Your should to signUp");
  }
  const resolved = await resolverFn(parent, args, context, info);
  return resolved;
};
