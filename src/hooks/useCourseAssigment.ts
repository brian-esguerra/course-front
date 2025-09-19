import { useAssignCourseMutation, useCheckAssignmentQuery } from "../app/api/assignApi";

export const useCourseAssignment = (userId?: number, courseId?: number) => {
  // Solo ejecutar la validación si existe userId y courseId
  const { data: checkData, isLoading: checking, refetch } = useCheckAssignmentQuery(
    { userId: userId!, courseId: courseId! },
    { skip: !userId || !courseId }
  );

  // asignar
  const [assignCourse, { isLoading: assigning, error: assignError }] = useAssignCourseMutation();

  // Función de asignación con refresh automático
  const handleAssign = async () => {
    if (!userId || !courseId) return;

    try {
      const result = await assignCourse({ userId, courseId }).unwrap();
      await refetch();
      return result;
    } catch (error) {
      console.error("Error en la asignación:", error);
      throw error;
    }
  };

  return {
    assigned: checkData?.assigned ?? false,
    assignment: checkData?.assignment,
    checking,
    assigning,
    assignError,
    handleAssign,
    refetch,
  };
};
