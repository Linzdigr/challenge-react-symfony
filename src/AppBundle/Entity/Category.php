<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\ArrayCollection;
    use AppBundle\Entity\AbstractGenericEntity;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="categories")
     */
    class Category extends AbstractGenericEntity{

        /**
         * @ORM\Column(type="string")
         */
        protected $label;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        /**
         * @ORM\OneToMany(targetEntity="Operation", mappedBy="category")
         * @var Operation[]
         */
        protected $operations;

        public function __construct($name = null){
            $this->operations = new ArrayCollection();
            $this->name = $name;
        }

        public function getName(){
            return $this->label;
        }

        public function getDescription(){
            return $this->description;
        }

        public function getCategory(){
            return $this->accountSheet;
        }

        public function __destruct(){}
    }
