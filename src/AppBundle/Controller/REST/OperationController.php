<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Form\Type\OperationType;
use AppBundle\Entity\Operation;

class OperationController extends BaseRestController{
    /**
     * @Rest\View()
     * @Rest\Get("/account/{account_id}/sheets/{sheet_id}/operations")
     */
    public function getOperationsAction($account_id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        return $account->getSheetById($sheet_id)->getOperations();
    }

    /**
     * @Rest\View()
     * @Rest\Get("/operation/{id}")
     */
    public function getOperationAction($id, Request $request){
        $operation = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Operation')
                 ->find($id);

        $operation = new Operation();

        return $operation;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/operation")
     */
    public function postOperationAction(Request $request)
    {
        $operation = new Operation();

        $form = $this->createForm(OperationType::class, $operation);
        $form->submit($request->request->all()); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($operation);
            $em->flush();

            return $operation;
        }

        return $form;
    }

    /**
     * @Rest\View()
     * @Rest\Put("/operation/{id}")
     */
    public function putOperationAction($id, Request $request){
        $operation = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:Operation')
                    ->find($id);

        if (empty($operation)) {
            return new JsonResponse(['message' => 'Operation not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(OperationType::class, $operation);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');

            $em->merge($operation);    // Pas nécessaire, juste pas mesure de clarté
            $em->flush();
            return $operation;
        }

        return $form;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/operation/{id}")
     */
    public function removeOperationAction($id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $operation = $em->getRepository('AppBundle:Operation')
                    ->find($id);

        if($operation){
            $em->remove($operation);
            $em->flush();
        }
    }
}
