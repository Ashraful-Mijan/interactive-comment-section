// 'use client'
import { createServer, Factory, Model, RestSerializer } from "miragejs";
import data from "@/app/fake-db/data.json";

export function makeServer({ environment = "development" } = {}) {
  let response = {};
  const server = createServer({
    environment,
    serializers: {
      currentUsers: RestSerializer.extend({
        include: ["image"],
        embed: true,
      }),
      comments: RestSerializer.extend({
        include: ["user", "image", "replies"],
        embed: true,
      }),
    },

    models: {
      currentUser: Model,
      comment: Model,
    },

    fixtures: {
      currentUsers: data.currentUser,
      comments: data.comments,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.namespace = "api";
      this.get("/currentUser", (schema, request) => {
        return schema.currentUsers.all();
      });
      this.get("/comments", (schema, request) => {
        return schema.comments.all();
      });
      this.post("/comments", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        const templateComment = {
          ...attrs,
          createdAt: new Date().getTime(),
          score: 0,
          replies: [],
        };

        if (attrs.parentId) {
          const parentComment = schema.comments.find(parentId);
          parentComment.update({ replies: [...parentComment.replies, newComment.id] });

          return parentComment;
        }

        return schema.comments.create(templateComment);
      });
      this.passthrough();
      this.passthrough("https://jsonplaceholder.typicode.com/**");
    },
  });

  return server;
}

// {
//   "id": 1,
//   "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
//   "createdAt": "1 month ago",
//   "score": 12,
//   "user": {
//     "image": {
//       "png": "/images/avatars/image-amyrobson.png",
//       "webp": "/images/avatars/image-amyrobson.webp"
//     },
//     "username": "amyrobson"
//   },
//   "replies": []
// },
