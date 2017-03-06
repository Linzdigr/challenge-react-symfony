<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Entity\Category;
use AppBundle\Form\Type\CategoryType;

class CategoryController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/categories", name="category_list")
     */
    public function getCategoriesAction(Request $request){
        $cats = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Category')
            ->findAll();

        return $this->apiResponse($cats);
    }

    /**
     * @Method("GET")
     * @Route("/category/{id}", name="category_one", requirements={"id": "\d+"})
     */
    public function getCategoryAction($id, Request $request){
        $cat = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Category')
                 ->find($id);

        return $this->apiResponse($cat);
    }

    /**
     * @Method("POST")
     * @Route("/category", name="category_create")
     */
    public function postCategoryAction(Request $request)
    {
        $cat = new Category();

        if ($content = $request->getContent()) {    // TODO: enhance json decode in controllers
            $jsonPost = json_decode($content, true);
        }

        $form = $this->createForm(CategoryType::class, $cat);
        $form->submit($jsonPost); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($cat);
            $em->flush();

            return $this->apiResponse($cat, Response::HTTP_CREATED);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("PUT")
     * @Route("/category/{id}", name="category_modify", requirements={"id": "\d+"})
     */
    public function putCategoryAction($cat_id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $cat = $em->getRepository('AppBundle:Category')
                    ->find($cat_id);

        if ($content = $request->getContent())    // TODO: enhance json decode in controllers
            $jsonPost = json_decode($content, true);

        if(empty($cat))
            return $this->notFound('Category');

        $form = $this->createForm(CategoryType::class, $cat);

        $form->submit($jsonPost);

        if ($form->isValid()) {
            $em->merge($cat);    // Pas nécessaire, juste pas mesure de clarté
            $em->flush();
            return $this->apiResponse($cat);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("DELETE")
     * @Route("/category/{id}", name="category_destroy", requirements={"id": "\d+"})
     */
    public function removeCategoryAction($id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $cat = $em->getRepository('AppBundle:Category')
                    ->find($id);
        if ($cat) {
            $em->remove($cat);
            $em->flush();
        }

        return $this->apiResponse([]);
    }
}
