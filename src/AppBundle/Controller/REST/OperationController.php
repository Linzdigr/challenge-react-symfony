<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\Type\OperationType;
use AppBundle\Entity\Operation;

class OperationController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operations", name="operation_list")
     */
    public function getOperationsAction($account_id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if(empty($aSheet))
            $this->notFound('Sheet');

        return $this->apiResponse($aSheet->getOperations());
    }

    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_one")
     */
    public function getOperationAction($account_id, $sheet_id, $operation_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if(empty($aSheet))
            $this->notFound('Sheet');

        return $this->apiResponse($aSheet->getOperationById($operation_id));
    }

    /**
     * @Method("POST")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation", name="operation_create")
     */
    public function postOperationAction($account_id, $sheet_id, Request $request)
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
     * @Method("PUT")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_modify")
     */
    public function putOperationAction($account_id, $sheet_id, $operation_id, Request $request){
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
     * @Method("DELETE")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_destroy")
     */
    public function removeOperationAction($account_id, $sheet_id, $operation_id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $operation = $em->getRepository('AppBundle:Operation')
                    ->find($id);

        if($operation){
            $em->remove($operation);
            $em->flush();
        }
    }
}
