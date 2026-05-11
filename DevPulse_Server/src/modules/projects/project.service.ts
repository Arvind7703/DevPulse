import prisma from '../../config/db';
import crypto from "crypto"

export const createProjectService = async (name: string, userId: string) => {
  return prisma.project.create({
    data: {
      name,
      userId,
    },
  });
};

export const getProjectService = async (userId: string) => {
  return prisma.project.findMany({
    where: {
      userId,
    },
  });
};

export const getSingleProjectService = async (
  projectId: string,
  userId: string,
) => {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });
};

export const updateProjectService = async (
  projectId: string,
  userId: string,
  name: string,
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name,
    },
  });
};

export const deleteProjectService = async (
  projectId: string,
  userId: string,
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return prisma.project.delete({
    where: {
      id: projectId,
    },
  });
};

export const rotateApiKeyService = async (
  projectId: string,
  userId: string,
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      apiKey: crypto.randomUUID(),
    },
  });
};
