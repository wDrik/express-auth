const express = require("express");
const router = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const aclMiddleware = require("./app/middlewares/acl");

/**
 * Controllers
 */
const AuthController = require("./app/controllers/AuthController");
const ProjectController = require("./app/controllers/ProjectController");

/**
 * Authenticate routes
 */
router.post("/auth/register", AuthController.register);
router.post("/auth/authenticate", AuthController.authenticate);
router.post("/auth/get_user_by_id", authMiddleware, AuthController.getUserById);
router.post("/auth/forgot_password", AuthController.forgotPassword);
router.post("/auth/reset_password", AuthController.resetPassword);

/**
 * Project routes
 */
router.get("/projects", authMiddleware, ProjectController.index);
router.get("/projects/:projectId", authMiddleware, ProjectController.show);

router.post(
  "/projects",
  authMiddleware,
  aclMiddleware,
  ProjectController.store
);

router.put(
  "/projects/:projectId",
  authMiddleware,
  aclMiddleware,
  ProjectController.update
);

router.delete(
  "/projects/:projectId",
  authMiddleware,
  aclMiddleware,
  ProjectController.remove
);

module.exports = router;
