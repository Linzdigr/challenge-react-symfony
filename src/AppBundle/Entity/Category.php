<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\ArrayCollection;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="categories")
     * @ORM\HasLifecycleCallbacks
     */
    class Category{
        /**
         * @ORM\Id
         * @ORM\Column(type="integer", nullable=false)
         * @ORM\GeneratedValue(strategy="IDENTITY")
         */
        protected $id;

        /**
         * @ORM\Column(type="string")
         */
        protected $label;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        /**
         * @ORM\Column(type="datetime")
         */
        protected $created_at;

        /**
         * @ORM\Column(type="datetime")
         */
        protected $updated_at;

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

        /**
         * @ORM\PrePersist
         */
        public function preInsert(){
            $this->created_at = $this->updated_at = new \DateTime('now');
        }

        /** @ORM\PreUpdate */
        public function preUpdate(){
            $this->updated_at = new \DateTime('now');
        }

        public function __destruct(){}
    }
