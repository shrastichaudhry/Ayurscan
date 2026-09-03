FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile 

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN pnpm exec prisma generate
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]